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
    this.store.selectedShapes.forEach((shape) => {
      shape.setOffsetX(e.offsetX - shape.x);
      shape.setOffsetY(e.offsetY - shape.y);
      shape.select();
    });
    this.drawGroupOutline();
  }

  mouseMove(e: MouseEvent): void {
    document.body.style.cursor = this.store.shapes.some((shape) => shape.contains(e.offsetX, e.offsetY)) ? 'move' : this.cursor;
    if (!this.isDrawing) return;
    this.store.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.store.selectedShapes.forEach((shape) => shape.select());
    this.drawGroupOutline();
  }

  mouseUp(): void {
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }

  private selectGroup(e: MouseEvent): boolean {
    const selected = [...this.store.groups].reverse().find((group) => group.some((shape) => shape.contains(e.offsetX, e.offsetY)));
    if (!selected) return false;
    this.store.selectedShapes = selected;
    return true;
  }

  private selectShape(e: MouseEvent): boolean {
    const index = [...this.store.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return false;
    const selected = this.store.shapes[this.store.shapes.length - index - 1];
    if (!e.shiftKey) {
      this.store.selectedShapes = [selected];
      return true;
    }
    if (this.store.selectedShapes.includes(selected)) {
      this.store.selectedShapes = this.store.selectedShapes.filter((shape) => shape !== selected);
      return true;
    }
    this.store.selectedShapes.push(selected);
    return true;
  }

  private drawGroupOutline(): void {
    if (this.store.selectedShapes.length <= 1) return;
    this.store.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    const minX = Math.min(...this.store.selectedShapes.map((shape) => shape.minX));
    const minY = Math.min(...this.store.selectedShapes.map((shape) => shape.minY));
    const maxX = Math.max(...this.store.selectedShapes.map((shape) => shape.maxX));
    const maxY = Math.max(...this.store.selectedShapes.map((shape) => shape.maxY));
    this.store.ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    this.store.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }
}
