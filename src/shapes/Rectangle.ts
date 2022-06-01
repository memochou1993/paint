import Shape from './Shape';
import {
  AnchorStyle,
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

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  draw(): void {
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  select(): void {
    const { HEIGHT, WIDTH } = AnchorStyle;
    this.ctx.fillStyle = AnchorStyle.FILL_COLOR;
    this.ctx.beginPath();
    this.ctx.rect(this.x + this.width / 2 - WIDTH / 2, this.y - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x + this.width / 2 - WIDTH / 2, this.y + this.height - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x - WIDTH / 2, this.y + this.height / 2 - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.rect(this.x + this.width - WIDTH / 2, this.y + this.height / 2 - HEIGHT / 2, WIDTH, HEIGHT);
    this.ctx.fill();
  }

  contains(x: number, y: number): boolean {
    const path = new Path2D();
    path.rect(this.x, this.y, this.width, this.height);
    return this.ctx.isPointInPath(path, x, y);
  }

  isShapeless(): boolean {
    return this.width * this.height === 0;
  }
}
