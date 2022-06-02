export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
  }

  setX(x: number): void {
    this.x = x;
  }

  setY(y: number): void {
    this.y = y;
  }

  abstract draw(): void;
  
  abstract select(): void;
  
  abstract contains(x: number, y: number): boolean;

  abstract isShapeless(): boolean;
}
