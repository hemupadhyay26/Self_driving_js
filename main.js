/**
 @type {HTMLCanvasElement}
 */
import { Point } from "./js/primitive/point.js";
import { Segment } from "./js/primitive/segment.js";
import { Graph } from "./js/math/graph.js";
import { GraphEditor } from "./js/graphEditor.js";
import { ViewPort } from "./js/viewPort.js";

// btns use case
// const addPoints = document.getElementById("addPoints");
// addPoints.addEventListener("click", function addRandomPoint() {
//   const success = graph.tryaddPoint(
//     new Point(Math.random() * myCanvas.width, Math.random() * myCanvas.height)
//   );
//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
//   console.log(success);
// });

// const addSegment = document.getElementById("addSegment");
// addSegment.addEventListener("click", function () {
//   const index1 = Math.floor(Math.random() * graph.points.length);
//   const index2 = Math.floor(Math.random() * graph.points.length);
//   const success = graph.tryaddSegment(
//     new Segment(graph.points[index1], graph.points[index2])
//   );

//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
//   console.log(graph.segments);
// });

// const removeSegment = document.getElementById("removeSegment");
// removeSegment.addEventListener("click", function () {
//   if (graph.segments.length == 0) {
//     alert("no segments");
//   }
//   const index = Math.floor(Math.random() * graph.segments.length);
//   graph.removeSegment(graph.segments[index]);
//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
// });

// const removePoint = document.getElementById("removePoint");
// removePoint.addEventListener("click", function () {
//   if (graph.points.length == 0) {
//     alert("no point");
//   }
//   const index = Math.floor(Math.random() * graph.points.length);
//   graph.removePoint(graph.points[index]);
//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
// });

// const removeAll = document.getElementById("removeAll");
// removeAll.addEventListener("click", function () {
//   graph.dispose();
//   ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
//   graph.draw(ctx);
// });

myCanvas.width = 600;
myCanvas.height = 600;
const ctx = myCanvas.getContext("2d");

const p1 = new Point(200, 200);
const p2 = new Point(500, 200);
const p3 = new Point(400, 400);
const p4 = new Point(100, 300);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p1, p3);
const s3 = new Segment(p1, p4);
const s4 = new Segment(p3, p4);
const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
const viewPort = new ViewPort(myCanvas);
const graphEditor = new GraphEditor(viewPort, graph);

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  ctx.save();

  ctx.translate(viewPort.center.x, viewPort.center.y);
  ctx.scale(1 / viewPort.zoom, 1 / viewPort.zoom);
  const offset = viewPort.getOffset();
  ctx.translate(offset.x, offset.y);
  graphEditor.display();
  ctx.restore();
  requestAnimationFrame(animate);
}

animate();
