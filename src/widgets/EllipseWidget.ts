import Widget from './Widget';
import { WidgetType } from '../enums';
import { Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  readonly type = WidgetType.ELLIPSE;

  shape: Ellipse = new Ellipse();

  shapes: Array<Ellipse> = [];

  offsetX = 0;

  offsetY = 0;

  isMoving = false;

  onCanvasMousedown(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const rect = this.canvas.getBoundingClientRect();
    this.offsetX = rect.left;
    this.offsetY = rect.top;
    this.shape.setX(e.clientX - this.offsetX);
    this.shape.setY(e.clientY - this.offsetY);
    this.isMoving = true;
  };

  onCanvasMousemove(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.isMoving) {
      this.clear();
      this.shapes.forEach((shape) => this.draw(shape));
      this.shape.setRadiusX(Math.abs(e.clientX - this.offsetX - this.shape.x));
      this.shape.setRadiusY(Math.abs(e.clientY - this.offsetY - this.shape.y));
      this.draw(this.shape);
    }
  };

  onCanvasMouseup(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.shapes.push(Object.assign(new Ellipse(), this.shape));
    this.isMoving = false;
  };

  onCanvasMouseout(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isMoving = false;
  };

  draw(shape: Ellipse): void {
    this.ctx.beginPath();
    this.ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, shape.rotation, shape.startAngle, shape.endAngle);
    this.ctx.stroke();
  }
}
