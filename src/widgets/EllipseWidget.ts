import Widget from './Widget';
import { WidgetType } from '../enums';
import { Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  readonly element: Element = document.getElementById(WidgetType.Ellipse) as Element;
  
  readonly cursor: string = 'crosshair';

  private shape: Ellipse = new Ellipse(this.canvas.ctx);

  private startX = 0;

  private startY = 0;

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
    this.shape = new Ellipse(this.canvas.ctx);
    this.startX = e.offsetX;
    this.startY = e.offsetY;
  }

  mouseMove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.canvas.clear();
    this.canvas.redraw();
    const offsetX = (e.offsetX - this.startX) / 2;
    const offsetY = (e.offsetY - this.startY) / 2;
    this.shape.setX(this.startX + offsetX);
    this.shape.setY(this.startY + offsetY);
    this.shape.setRadiusX(Math.abs(offsetX) * Math.sqrt(2));
    this.shape.setRadiusY(Math.abs(offsetY) * Math.sqrt(2));
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
