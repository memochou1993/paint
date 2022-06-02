import Widget from './Widget';
import { Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  private shape: Ellipse = new Ellipse(this.ctx);

  private isDrawing = false;

  private startX = 0;

  private startY = 0;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.isDrawing = true;
    this.shape = new Ellipse(this.ctx);
    this.startX = e.offsetX;
    this.startY = e.offsetY;
  }

  mouseMove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.clear();
    this.redraw();
    const offsetX = (e.offsetX - this.startX) / 2;
    const offsetY = (e.offsetY - this.startY) / 2;
    this.shape.setX(this.startX + offsetX);
    this.shape.setY(this.startY + offsetY);
    this.shape.setRadiusX(Math.abs(offsetX) * Math.sqrt(2));
    this.shape.setRadiusY(Math.abs(offsetY) * Math.sqrt(2));
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
