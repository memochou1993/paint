export default abstract class Shape {
  protected ctx: CanvasRenderingContext2D;

  x: number;

  y: number;

  offsetX: number = 0;

  offsetY: number = 0;

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

  setOffsetX(offsetX: number): void {
    this.offsetX = offsetX;
  }

  setOffsetY(offsetY: number): void {
    this.offsetY = offsetY;
  }

  abstract get minX(): number;

  abstract get minY(): number;

  abstract get maxX(): number;

  abstract get maxY(): number;

  abstract draw(): void;

  abstract select(): void;

  abstract contains(x: number, y: number): boolean;

  abstract isShapeless(): boolean;
}
