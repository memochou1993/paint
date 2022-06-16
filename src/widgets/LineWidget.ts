import Widget from './Widget';
import { WidgetType } from '../enums';
import { Line } from '../shapes';

export default class LineWidget extends Widget {
  readonly element: Element = document.getElementById(WidgetType.Line) as Element;

  readonly cursor: string = 'crosshair';

  private shape: Line | null = null;

  mouseDown(e: MouseEvent): void {
    this.shape = new Line(this.canvas.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  mouseMove(e: MouseEvent): void {
    if (!this.shape) return;
    this.canvas.clear();
    this.canvas.redraw();
    this.shape.setToX(e.offsetX);
    this.shape.setToY(e.offsetY);
    this.shape.draw();
  }

  mouseUp(): void {
    if (!this.shape) return;
    if (!this.shape.isShapeless()) this.canvas.shapes.push(this.shape);
    this.shape = null;
  }

  mouseOut(): void {
    this.mouseUp();
  }
}
