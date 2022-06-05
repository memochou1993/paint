import Tool from './Tool';

export default class GroupTool extends Tool {
  id(): string {
    return 'delete';
  }

  onClick(): void {
    if (this.canvas.selectedShapes.length < 1) return;
    this.canvas.groups = this.canvas.groups.filter((group) => group !== this.canvas.selectedShapes);
    this.canvas.shapes = this.canvas.shapes.filter((shape) => !this.canvas.selectedShapes.some((selectedShape) => selectedShape === shape));
    this.canvas.clear();
    this.canvas.redraw();
  }
}
