import Tool from './Tool';

export default class GroupTool extends Tool {
  id(): string {
    return 'group';
  }

  onClick(): void {
    if (this.canvas.selectedShapes.length < 2) return;
    if (this.canvas.groups.some((group) => group === this.canvas.selectedShapes)) return;
    this.canvas.groups.push(this.canvas.selectedShapes);
  }
}
