import Widget from './Widget';
import { WidgetType } from '../enums';
import { Shape, Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly type = WidgetType.RECTANGLE;

  private shape: Rectangle = new Rectangle(this.ctx);

  onCanvasClick(): void {}

  onCanvasMousedown(e: MouseEvent): void {
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onCanvasMousemove(e: MouseEvent): void {
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  onCanvasMouseup(): Shape {
    return new Rectangle(this.ctx).assign(this.shape);
  }

  onCanvasMouseout(): Shape {
    return new Rectangle(this.ctx).assign(this.shape);
  }
}
