import Widget from './Widget';
import { Shape } from '../shapes';

export default class CursorWidget extends Widget {
  private shape: Shape | null = null;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.clear();
    this.redraw();
    const index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return;
    this.shape = this.shapes[this.shapes.length - index - 1];
    this.shape.setOffsetX(e.offsetX - this.shape.x);
    this.shape.setOffsetY(e.offsetY - this.shape.y);
    this.shape.select();
  }

  mouseMove(e: MouseEvent): void {
    if (!this.shape) return;
    this.shape.setX(e.offsetX - this.shape.offsetX);
    this.shape.setY(e.offsetY - this.shape.offsetY);
    this.clear();
    this.redraw();
    this.shape.select();
  }

  mouseUp(): void {
    this.shape = null;
  }

  mouseOut(): void {
    this.shape = null;
  }
}
