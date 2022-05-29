export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  order: number = -1;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
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

  setOrder(order: number) {
    this.order = order;
  }

  assign(shape: Shape): Shape {
    return Object.assign(this, shape);
  }

  abstract draw(): void;
  
  abstract select(): void;
  
  abstract contains(x: number, y: number): boolean;

  abstract isShapeless(): boolean;
}
