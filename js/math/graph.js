export class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }
  draw(context) {
    for (const seg of this.segments) {
      seg.draw(context);
    }
    for (const point of this.points) {
      point.draw(context);
    }
  }
  addPoint(point) {
    this.points.push(point);
  }
  addSegment(seg) {
    this.segments.push(seg);
  }
  constainsPoints(point) {
    return this.points.find((p) => p.equals(point));
  }
  constainsSegments(seg) {
    return this.segments.find((s) => s.equals(seg));
  }
  tryaddPoint(point) {
    if (!this.constainsPoints(point)) {
      this.addPoint(point);
      return true;
    } else {
      return false;
    }
  }
  tryaddSegment(seg) {
    if (!this.constainsSegments(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg);
      return true;
    } else return false;
  }
  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }
  getSegmentsWithPoint(point) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        segs.push(seg);
      }
    }
    return segs;
  }
  removePoint(point) {
    const segs = this.getSegmentsWithPoint(point);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }
  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }
}
