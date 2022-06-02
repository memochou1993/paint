import Widget from './Widget';
import { Shape } from '../shapes';

export default class CursorWidget extends Widget {
  private shape: Shape | null = null;
  
  private offsetX = 0;
  
  private offsetY = 0;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.clear();
    this.redraw();
    const index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return;
    this.shape = this.shapes[this.shapes.length - index - 1];
    this.offsetX = e.offsetX - this.shape.x;
    this.offsetY = e.offsetY - this.shape.y;
    this.shape.select();
  }

  mouseMove(e: MouseEvent): void {
    if (!this.shape) return;
    this.clear();
    this.redraw();
    this.shape.setX(e.offsetX - this.offsetX);
    this.shape.setY(e.offsetY - this.offsetY);
    this.shape.select();
  }

  mouseUp(): void {
    this.shape = null;
  }

  mouseOut(): void {
    this.shape = null;
  }
}
