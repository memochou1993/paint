import Widget from './Widget';
import { Shape } from '../shapes';

export default class CursorWidget extends Widget {
  private selectedShapes: Array<Shape> = [];

  private groups: Array<Array<Shape>> = [];

  onMouseDown(e: MouseEvent): void {
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

  onMouseMove(e: MouseEvent): void {
    this.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.selectedShapes.forEach((shape) => shape.select());
  }

  onMouseUp(): void {}

  onMouseOut(): void {}

  onGroup(): void {
    if (this.selectedShapes.length <= 1) return;
    if (this.groups.some((group) => group === this.selectedShapes)) return;
    this.groups.push(this.selectedShapes);
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
