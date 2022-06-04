import Widget from './Widget';
import { OutlineStyle, ShapeStyle } from '../constants';

export default class CursorWidget extends Widget {
  readonly cursor: string = 'default';

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
    this.clear();
    this.redraw();
    if (!this.selectGroup(e) && !this.selectShape(e)) {
      this.setIsDrawing(false);
      return;
    }
    this.storage.selectedShapes.forEach((shape) => {
      shape.setOffsetX(e.offsetX - shape.x);
      shape.setOffsetY(e.offsetY - shape.y);
      shape.select();
    });
    this.drawGroupOutline();
  }

  mouseMove(e: MouseEvent): void {
    document.body.style.cursor = this.storage.shapes.some((shape) => shape.contains(e.offsetX, e.offsetY)) ? 'move' : this.cursor;
    if (!this.isDrawing) return;
    this.storage.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.storage.selectedShapes.forEach((shape) => shape.select());
    this.drawGroupOutline();
  }

  mouseUp(): void {
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }

  group(): void {
    if (this.storage.selectedShapes.length <= 1) return;
    if (this.storage.groups.some((group) => group === this.storage.selectedShapes)) return;
    this.storage.groups.push(this.storage.selectedShapes);
  }

  ungroup(): void {
    this.storage.groups = this.storage.groups.filter((group) => group !== this.storage.selectedShapes);
  }

  private selectGroup(e: MouseEvent): boolean {
    const selected = [...this.storage.groups].reverse().find((group) => group.some((shape) => shape.contains(e.offsetX, e.offsetY)));
    if (!selected) return false;
    this.storage.selectedShapes = selected;
    return true;
  }

  private selectShape(e: MouseEvent): boolean {
    const index = [...this.storage.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return false;
    const selected = this.storage.shapes[this.storage.shapes.length - index - 1];
    if (!e.shiftKey) {
      this.storage.selectedShapes = [selected];
      return true;
    }
    if (this.storage.selectedShapes.includes(selected)) {
      this.storage.selectedShapes = this.storage.selectedShapes.filter((shape) => shape !== selected);
      return true;
    }
    this.storage.selectedShapes.push(selected);
    return true;
  }

  private drawGroupOutline(): void {
    if (this.storage.selectedShapes.length <= 1) return;
    this.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    const minX = Math.min(...this.storage.selectedShapes.map((shape) => shape.minX));
    const minY = Math.min(...this.storage.selectedShapes.map((shape) => shape.minY));
    const maxX = Math.max(...this.storage.selectedShapes.map((shape) => shape.maxX));
    const maxY = Math.max(...this.storage.selectedShapes.map((shape) => shape.maxY));
    this.ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }
}
