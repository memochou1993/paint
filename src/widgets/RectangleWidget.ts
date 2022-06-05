import Widget from './Widget';
import { WidgetType } from '../enums';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly element: Element = document.getElementById(WidgetType.Rectangle) as Element;
  
  readonly cursor: string = 'crosshair';
  
  private shape: Rectangle = new Rectangle(this.canvas.ctx);

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
    this.shape = new Rectangle(this.canvas.ctx);
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
    this.canvas.shapes.push(this.shape);
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }
}
