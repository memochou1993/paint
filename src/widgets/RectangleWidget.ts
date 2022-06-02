import Widget from './Widget';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  private shape: Rectangle | null = null;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  mouseMove(e: MouseEvent): void {
    if (!this.shape) return;
    this.clear();
    this.redraw();
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  mouseUp(): void {
    if (!this.shape) return;
    this.shapes.push(this.shape);
    this.shape = null;
  }

  mouseOut(): void {
    if (!this.shape) return;
    this.shapes.push(this.shape);
    this.shape = null;
  }
}
