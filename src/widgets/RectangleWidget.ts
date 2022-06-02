import Widget from './Widget';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  private shape: Rectangle = new Rectangle(this.ctx);

  private isDrawing = false;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.isDrawing = true;
    this.shape = new Rectangle(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  mouseMove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.clear();
    this.redraw();
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  mouseUp(): void {
    this.isDrawing = false;
    this.shapes.push(this.shape);
  }

  mouseOut(): void {
    this.isDrawing = false;
    this.shapes.push(this.shape);
  }
}
