export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  constructor(ctx: CanvasRenderingContext2D, x: number = 0, y: number = 0) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  assign(shape: Shape): Shape {
    return Object.assign(this, shape);
  }

  abstract draw(): void;
  
  abstract select(): void;
  
  abstract contains(x: number, y: number): boolean;

  abstract isShapeless(): boolean;
}
