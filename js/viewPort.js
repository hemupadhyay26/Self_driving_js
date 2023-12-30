import { add, scale, substract } from "./math/utils.js";
import { Point } from "./primitive/point.js";

export class ViewPort {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };
    this.#addEventListener();
  }

  getMouse(e) {
    return new Point(
      (e.offsetX - this.center.x) * this.zoom - this.offset.x,
      (e.offsetY - this.center.y) * this.zoom - this.offset.y
    );
  }
  getOffset(e) {
    return add(this.offset, this.drag.offset);
  }
  #addEventListener() {
    this.canvas.addEventListener(
      "mousewheel",
      this.#handleMouseWheel.bind(this)
    );
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));
  }
  #handleMouseDown(e) {
    if (e.button === 1) {
      // middle btn
      this.drag.start = this.getMouse(e);
      this.drag.active = true;
    }
  }
  #handleMouseMove(e) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e);
      this.drag.offset = substract(this.drag.end, this.drag.start);
    }
  }
  #handleMouseUp(e) {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }
  #handleMouseWheel(e) {
    const direction = Math.sign(e.deltaY);
    const step = 0.1;
    this.zoom += direction * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }
}
