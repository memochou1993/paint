import Widget from './Widget';
import { Ellipse } from '../shapes';

export default class EllipseWidget extends Widget {
  private shape: Ellipse = new Ellipse(this.ctx);

  private isDrawing = false;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.isDrawing = true;
    this.shape = new Ellipse(this.ctx);
    this.shape.setX(e.offsetX);
    this.shape.setY(e.offsetY);
  }

  mouseMove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.clear();
    this.redraw();
    this.shape.setRadiusX(Math.abs(e.offsetX - this.shape.x) * Math.sqrt(2));
    this.shape.setRadiusY(Math.abs(e.offsetY - this.shape.y) * Math.sqrt(2));
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
