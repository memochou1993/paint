import Widget from './Widget';
import { WidgetType } from '../enums';
import { OutlineStyle, ShapeStyle } from '../constants';

export default class CursorWidget extends Widget {
  readonly element: Element = document.getElementById(WidgetType.Cursor) as Element;
  
  readonly cursor: string = 'default';

  mouseDown(e: MouseEvent): void {
    this.setIsDrawing(true);
    this.clear();
    this.redraw();
    if (!this.selectGroup(e) && !this.selectShape(e)) {
      this.setIsDrawing(false);
      return;
    }
    this.canvas.selectedShapes.forEach((shape) => {
      shape.setOffsetX(e.offsetX - shape.x);
      shape.setOffsetY(e.offsetY - shape.y);
      shape.select();
    });
    this.drawGroupOutline();
  }

  mouseMove(e: MouseEvent): void {
    document.body.style.cursor = this.canvas.shapes.some((shape) => shape.contains(e.offsetX, e.offsetY)) ? 'move' : this.cursor;
    if (!this.isDrawing) return;
    this.canvas.selectedShapes.forEach((shape) => {
      shape.setX(e.offsetX - shape.offsetX);
      shape.setY(e.offsetY - shape.offsetY);
    });
    this.clear();
    this.redraw();
    this.canvas.selectedShapes.forEach((shape) => shape.select());
    this.drawGroupOutline();
  }

  mouseUp(): void {
    this.setIsDrawing(false);
  }

  mouseOut(): void {
    this.mouseUp();
  }

  private selectGroup(e: MouseEvent): boolean {
    const selected = [...this.canvas.groups].reverse().find((group) => group.some((shape) => shape.contains(e.offsetX, e.offsetY)));
    if (!selected) return false;
    this.canvas.selectedShapes = selected;
    return true;
  }

  private selectShape(e: MouseEvent): boolean {
    const index = [...this.canvas.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return false;
    const selected = this.canvas.shapes[this.canvas.shapes.length - index - 1];
    if (!e.shiftKey) {
      this.canvas.selectedShapes = [selected];
      return true;
    }
    if (this.canvas.selectedShapes.includes(selected)) {
      this.canvas.selectedShapes = this.canvas.selectedShapes.filter((shape) => shape !== selected);
      return true;
    }
    this.canvas.selectedShapes.push(selected);
    return true;
  }

  private drawGroupOutline(): void {
    if (this.canvas.selectedShapes.length <= 1) return;
    this.canvas.ctx.strokeStyle = OutlineStyle.STROKE_COLOR;
    const minX = Math.min(...this.canvas.selectedShapes.map((shape) => shape.minX));
    const minY = Math.min(...this.canvas.selectedShapes.map((shape) => shape.minY));
    const maxX = Math.max(...this.canvas.selectedShapes.map((shape) => shape.maxX));
    const maxY = Math.max(...this.canvas.selectedShapes.map((shape) => shape.maxY));
    this.canvas.ctx.strokeRect(minX, minY, maxX - minX, maxY - minY);
    this.canvas.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }
}
