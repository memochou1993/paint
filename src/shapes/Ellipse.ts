import Shape from './Shape';
import {
  AnchorStyle,
  OutlineStyle,
  ShapeStyle,
} from '../constants';

export default class Ellipse extends Shape {
  radiusX: number;

  radiusY: number;

  rotation: number;

  startAngle: number;

  endAngle: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number = 0,
    y: number = 0,
    radiusX: number = 0,
    radiusY: number = 0,
    rotation: number = Math.PI,
    startAngle: number = 0,
    endAngle: number = Math.PI * 2,
  ) {
    super(ctx, x, y);
    this.radiusX = radiusX;
    this.radiusY = radiusY;
    this.rotation = rotation;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  setRadiusX(radiusX: number): void {
    this.radiusX = radiusX;
  }

  setRadiusY(radiusY: number): void {
    this.radiusY = radiusY;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    this.ctx.fill();
    this.ctx.stroke();
  }

  select(): void {
    this.anchor();
    this.outline();
  }

  contains(x: number, y: number): boolean {
    const path = new Path2D();
    path.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    return this.ctx.isPointInPath(path, x, y);
  }

  isShapeless(): boolean {
    return this.radiusX * this.radiusY === 0;
  }

  private anchor(): void {
    this.ctx.fillStyle = AnchorStyle.FILL_COLOR;
    const { HEIGHT: h, WIDTH: w } = AnchorStyle;
    this.ctx.beginPath();
    this.ctx.rect(this.x - w / 2, this.y - this.radiusY - h / 2, w, h);
    this.ctx.rect(this.x - w / 2, this.y + this.radiusY - h / 2, w, h);
    this.ctx.rect(this.x - this.radiusX - w / 2, this.y - h / 2, w, h);
    this.ctx.rect(this.x + this.radiusX - w / 2, this.y - h / 2, w, h);
    this.ctx.fill();
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
  }

  private outline(): void {
    this.ctx.lineWidth = OutlineStyle.LINE_WIDTH;
    this.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    this.ctx.stroke();
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
    this.ctx.lineWidth = ShapeStyle.LINE_WIDTH;
  }
}
