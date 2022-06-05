import Widget from './Widget';
import { WidgetType } from '../enums';
import { Rectangle } from '../shapes';

export default class RectangleWidget extends Widget {
  readonly element: Element = document.getElementById(WidgetType.Rectangle) as Element;
  
  readonly cursor: string = 'crosshair';
  
  private shape: Rectangle | null = null;

  mouseDown(e: MouseEvent): void {
    this.shape = new Rectangle(this.canvas.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  mouseMove(e: MouseEvent): void {
    if (!this.shape) return;
    this.canvas.clear();
    this.canvas.redraw();
    this.shape.setWidth(e.offsetX - this.shape.x);
    this.shape.setHeight(e.offsetY - this.shape.y);
    this.shape.draw();
  }

  mouseUp(): void {
    if (!this.shape) return;
    this.canvas.shapes.push(this.shape);
    this.shape = null;
  }

  mouseOut(): void {
    this.mouseUp();
  }
}
