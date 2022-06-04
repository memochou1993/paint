import Widget from './Widget';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly cursor: string = 'crosshair';
  
  private shape: Rectangle = new Rectangle(this.ctx);

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
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
    this.storage.shapes.push(this.shape);
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }
}
