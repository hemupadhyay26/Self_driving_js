import { getNearestPoint } from "./math/utils.js";
import { Point } from "./primitive/point.js";
import { Segment } from "./primitive/segment.js";

export class GraphEditor {
  constructor(viewPort, graph) {
    this.viewPort = viewPort;
    this.canvas = viewPort.canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;
    this.#addEventListener();
  }

  #addEventListener() {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#mouseMove.bind(this));

    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }

  #select(point) {
    if (this.selected) {
      this.graph.tryaddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }
  #handleMouseDown(e) {
    if (e.button === 2) {
      // right mouse button
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.#removePoint(this.hovered);
      }
    }
    if (e.button === 0) {
      // left mouse button
      if (this.hovered) {
        this.#select(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.tryaddPoint(this.mouse);
      this.#select(this.mouse);
      this.hovered = this.mouse;
    }
  }
  #mouseMove(e) {
    this.mouse = this.viewPort.getMouse(e);
    this.hovered = getNearestPoint(
      this.mouse,
      this.graph.points,
      20 * this.viewPort.zoom
    );
    if (this.dragging) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected === point) {
      this.selected = null;
    }
  }
  display() {
    this.graph.draw(this.ctx);
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }
  }
}
