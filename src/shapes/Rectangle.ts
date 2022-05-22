import Shape from './Shape';

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
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  isShapeless(): boolean {
    return this.width * this.height === 0;
  }
}
