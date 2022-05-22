import Shape from './Shape';

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
    this.ctx.stroke();
  }

  isShapeless(): boolean {
    return this.radiusX * this.radiusY === 0;
  }
}
