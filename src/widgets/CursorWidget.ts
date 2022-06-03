import Widget from './Widget';
import { Shape } from '../shapes';

export default class CursorWidget extends Widget {
  private selectedShapes: Array<Shape> = [];

  private groups: Array<Array<Shape>> = [];

  private isDrawing: boolean = false;

  click(): void {}

  mouseDown(e: MouseEvent): void {
    this.isDrawing = true;
    this.setOnGroup(() => {
      if (this.groups.some((group) => group === this.selectedShapes)) return;
      this.groups.push(this.selectedShapes);
    });
    this.clear();
    this.redraw();
    if (!this.selectGroup(e) && !this.selectShape(e)) {
      this.isDrawing = false;
      return;
    }
    this.selectedShapes.forEach((shape) => {
      shape.setOffsetX(e.offsetX - shape.x);
      shape.setOffsetY(e.offsetY - shape.y);
      shape.select();
    });
  }

  mouseMove(e: MouseEvent): void {
    if (!this.isDrawing) return;
    this.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.selectedShapes.forEach((shape) => shape.select());
  }

  mouseUp(): void {
    this.isDrawing = false;
  }

  mouseOut(): void {
    this.isDrawing = false;
  }

  private selectGroup(e: MouseEvent): boolean {
    const selected = [...this.groups].reverse().find((group) => group.some((shape) => shape.contains(e.offsetX, e.offsetY)));
    if (!selected) return false;
    this.selectedShapes = selected;
    return true;
  }

  private selectShape(e: MouseEvent): boolean {
    const index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return false;
    const selected = this.shapes[this.shapes.length - index - 1];
    if (!e.shiftKey) {
      this.selectedShapes = [selected];
      return true;
    }
    if (this.selectedShapes.includes(selected)) {
      this.selectedShapes = this.selectedShapes.filter((shape) => shape !== selected);
      return true;
    }
    this.selectedShapes.push(selected);
    return true;
  }
}
