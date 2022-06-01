import Widget from './Widget';
import { WidgetType } from '../enums';
import { Shape, Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  readonly type = WidgetType.ELLIPSE;

  private shape: Ellipse = new Ellipse(this.ctx);

  onCanvasClick(): void {}

  onCanvasMousedown(e: MouseEvent): void {
    this.shape = new Ellipse(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onCanvasMousemove(e: MouseEvent): void {
    this.shape.setRadiusX(Math.abs(e.offsetX - this.shape.x) * Math.sqrt(2));
    this.shape.setRadiusY(Math.abs(e.offsetY - this.shape.y) * Math.sqrt(2));
    this.shape.draw();
  }

  onCanvasMouseup(): Shape {
    return new Ellipse(this.ctx).assign(this.shape);
  }

  onCanvasMouseout(): Shape {
    return new Ellipse(this.ctx).assign(this.shape);
  }
}
