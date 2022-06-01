import Shape from './Shape';
import { AnchorStyle, ShapeStyle } from '../constants';

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

  setRadiusX(radiusX: number) {
    this.radiusX = radiusX;
  }

  setRadiusY(radiusY: number) {
    this.radiusY = radiusY;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    this.ctx.fill();
    this.ctx.stroke();
  }

  select(): void {
    const { HEIGHT, WIDTH } = AnchorStyle;
    this.ctx.fillStyle = AnchorStyle.FILL_COLOR;
    this.ctx.beginPath();
    this.ctx.rect(this.x - WIDTH / 2, this.y - this.radiusY - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x - WIDTH / 2, this.y + this.radiusY - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x - this.radiusX - WIDTH / 2, this.y - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x + this.radiusX - WIDTH / 2, this.y - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.fill();
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR_SELECTED;
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    this.ctx.stroke();
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }

  contains(x: number, y: number): boolean {
    const path = new Path2D();
    path.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    return this.ctx.isPointInPath(path, x, y);
  }

  isShapeless(): boolean {
    return this.radiusX * this.radiusY === 0;
  }
}
