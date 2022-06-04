import Widget from './Widget';
import { Shape } from '../shapes';
import { OutlineStyle, ShapeStyle } from '../constants';

export default class CursorWidget extends Widget {
  readonly cursor: string = 'default';

  private selectedShapes: Array<Shape> = [];

  private groups: Array<Array<Shape>> = [];

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
    this.clear();
    this.redraw();
    if (!this.selectGroup(e) && !this.selectShape(e)) {
      this.setIsDrawing(false);
      return;
    }
    this.selectedShapes.forEach((shape) => {
      shape.setOffsetX(e.offsetX - shape.x);
      shape.setOffsetY(e.offsetY - shape.y);
      shape.select();
    });
    this.drawGroupOutline();
  }

  mouseMove(e: MouseEvent): void {
    document.body.style.cursor = this.storage.shapes.some((shape) => shape.contains(e.offsetX, e.offsetY)) ? 'move' : this.cursor;
    if (!this.isDrawing) return;
    this.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.selectedShapes.forEach((shape) => shape.select());
    this.drawGroupOutline();
  }

  mouseUp(): void {
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }

  group(): void {
    if (this.selectedShapes.length <= 1) return;
    if (this.groups.some((group) => group === this.selectedShapes)) return;
    this.groups.push(this.selectedShapes);
  }

  ungroup(): void {
    this.groups = this.groups.filter((group) => group !== this.selectedShapes);
  }

  private selectGroup(e: MouseEvent): boolean {
    const selected = [...this.groups].reverse().find((group) => group.some((shape) => shape.contains(e.offsetX, e.offsetY)));
    if (!selected) return false;
    this.selectedShapes = selected;
    return true;
  }

  private selectShape(e: MouseEvent): boolean {
    const index = [...this.storage.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return false;
    const selected = this.storage.shapes[this.storage.shapes.length - index - 1];
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

  private drawGroupOutline(): void {
    if (this.selectedShapes.length <= 1) return;
    this.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    const minX = Math.min(...this.selectedShapes.map((shape) => shape.minX));
    const minY = Math.min(...this.selectedShapes.map((shape) => shape.minY));
    const maxX = Math.max(...this.selectedShapes.map((shape) => shape.maxX));
    const maxY = Math.max(...this.selectedShapes.map((shape) => shape.maxY));
    this.ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }
}
