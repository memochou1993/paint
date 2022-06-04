import Widget from './Widget';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  private shape: Rectangle = new Rectangle(this.ctx);

  onMouseDown(e: MouseEvent): void {
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  onMouseMove(e: MouseEvent): void {
    this.clear();
    this.redraw();
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  onMouseUp(): void {
    this.shapes.push(this.shape);
  }

  onMouseOut(): void {
    this.shapes.push(this.shape);
  }
}
