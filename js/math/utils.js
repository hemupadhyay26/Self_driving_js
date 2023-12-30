import { Point } from "../primitive/point.js";

export function getNearestPoint(
  loc,
  points,
  thershold = Number.MAX_SAFE_INTEGER
) {
  let minimumDistance = Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (const point of points) {
    const dist = distance(point, loc);
    if (dist < minimumDistance && dist < thershold) {
      minimumDistance = dist;
      nearest = point;
    }
  }
  return nearest;
}
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function add(p1, p2) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}
export function substract(p1, p2) {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}
export function scale(p, scaler) {
  return new Point(p.x * scaler, p.y * scaler);
}
