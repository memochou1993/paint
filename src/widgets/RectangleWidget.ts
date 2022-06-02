import Widget from './Widget';
import { WidgetType } from '../enums';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly type = WidgetType.Rectangle;

  private shape: Rectangle = new Rectangle(this.ctx);

  private isDrawing = false;

  onClick(): void {}

  onMousedown(e: MouseEvent): void {
    this.isDrawing = true;
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onMousemove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.clear();
    this.redraw();
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  onMouseup(): void {
    this.isDrawing = false;
    this.shapes.push(this.shape);
  }

  onMouseout(): void {
    this.isDrawing = false;
    this.shapes.push(this.shape);
  }
}
