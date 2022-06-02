import Shape from './Shape';
import {
  AnchorStyle,
  OutlineStyle,
  ShapeStyle,
} from '../constants';

export default class Rectangle extends Shape {
  width: number;

  height: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number = 0,
    y: number = 0,
    width: number = 0,
    height: number = 0,
  ) {
    super(ctx, x, y);
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  draw(): void {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  select(): void {
    this.anchor();
    this.outline();
  }

  contains(x: number, y: number): boolean {
    const path = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    return this.ctx.isPointInPath(path, x, y);
  }

  isShapeless(): boolean {
    return this.width * this.height === 0;
  }

  private anchor(): void {
    this.ctx.fillStyle = AnchorStyle.FILL_COLOR;
    const { HEIGHT: h, WIDTH: w } = AnchorStyle;
    this.ctx.beginPath();
    this.ctx.rect(this.x + this.width / 2 - w / 2, this.y - h / 2, w, h);
    this.ctx.rect(this.x + this.width / 2 - w / 2, this.y + this.height - h / 2, w, h);
    this.ctx.rect(this.x - w / 2, this.y + this.height / 2 - h / 2, w, h);
    this.ctx.rect(this.x + this.width - w / 2, this.y + this.height / 2 - h / 2, w, h);
    this.ctx.fill();
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
  }

  private outline(): void {
    this.ctx.lineWidth = OutlineStyle.LINE_WIDTH;
    this.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
    this.ctx.lineWidth = ShapeStyle.LINE_WIDTH;
  }
}
