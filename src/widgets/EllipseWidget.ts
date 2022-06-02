import Widget from './Widget';
import { WidgetType } from '../enums';
import { Shape, Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  readonly type = WidgetType.Ellipse;

  private shape: Ellipse = new Ellipse(this.ctx);

  onClick(): void {}

  onMousedown(e: MouseEvent): void {
    this.shape = new Ellipse(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onMousemove(e: MouseEvent): void {
    this.shape.setRadiusX(Math.abs(e.offsetX - this.shape.x) * Math.sqrt(2));
    this.shape.setRadiusY(Math.abs(e.offsetY - this.shape.y) * Math.sqrt(2));
    this.shape.draw();
  }

  onMouseup(): Promise<Shape> {
    return new Promise((res) => res(this.shape));
  }

  onMouseout(): Promise<Shape> {
    return new Promise((res) => res(this.shape));
  }
}
