import Tool from './Tool';

export default class GroupTool extends Tool {
  id(): string {
    return 'ungroup';
  }

  onClick(): void {
    if (this.canvas.selectedShapes.length < 2) return;
    this.canvas.groups = this.canvas.groups.filter((group) => group !== this.canvas.selectedShapes);
  }
}
