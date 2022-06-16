import Shape from './Shape';
import {
  ShapeStyle,
} from '../constants';

export default class Line extends Shape {
  toX: number;

  toY: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number = 0,
    y: number = 0,
    toX: number = 0,
    toY: number = 0,
  ) {
    super(ctx, x, y);
    this.toX = toX;
    this.toY = toY;
  }

  setToX(toX: number): void {
    this.toX = toX;
  }

  setToY(toY: number): void {
    this.toY = toY;
  }

  get minX(): number {
    return this.toX > 0 ? this.x : this.x + this.toX;
  }

  get minY(): number {
    return this.toY > 0 ? this.y : this.y + this.toY;
  }

  get maxX(): number {
    return this.toX > 0 ? this.x + this.toX :  this.x;
  }

  get maxY(): number {
    return this.toY > 0 ? this.y + this.toY : this.y;
  }

  draw(): void {
    this.ctx.lineWidth = ShapeStyle.LINE_WIDTH;
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.toX, this.toY);
    this.ctx.stroke();
  }

  select(): void {}

  contains(): boolean {
    return false;
  }

  isShapeless(): boolean {
    return this.toX === 0 && this.toY === 0;
  }
}
