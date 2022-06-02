import Widget from './Widget';
import { WidgetType } from '../enums';
import { Shape, Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly type = WidgetType.Rectangle;

  private shape: Rectangle = new Rectangle(this.ctx);

  onClick(): void {}

  onMousedown(e: MouseEvent): void {
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onMousemove(e: MouseEvent): void {
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  onMouseup(): Promise<Shape> {
    return new Promise((res) => res(this.shape));
  }

  onMouseout(): Promise<Shape> {
    return new Promise((res) => res(this.shape));
  }
}
