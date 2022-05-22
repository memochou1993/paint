import Widget from './Widget';
import { WidgetType } from '../enums';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly type = WidgetType.RECTANGLE;

  shape: Rectangle = new Rectangle();

  shapes: Array<Rectangle> = [];

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
  }

  onCanvasMousemove(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    if (this.isMoving) {
      this.clear();
      this.shapes.forEach((shape) => this.draw(shape));
      this.shape.setWidth(e.clientX - this.offsetX - this.shape.x);
      this.shape.setHeight(e.clientY - this.offsetY - this.shape.y);
      this.draw(this.shape);
    }
  }

  onCanvasMouseup(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.shapes.push(Object.assign(new Rectangle(), this.shape));
    this.isMoving = false;
  }

  onCanvasMouseout(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isMoving = false;
  }

  draw(shape: Rectangle): void {
    this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  }
}
