import Canvas from '../canvas';

export default class EditTool {
  private canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    this.init();
  }

  private init(): void {
    document.getElementById('delete')?.addEventListener('click', () => this.delete());
    document.getElementById('group')?.addEventListener('click', () => this.group());
    document.getElementById('ungroup')?.addEventListener('click', () => this.ungroup());
  }

  private delete(): void {
    this.canvas.groups = this.canvas.groups.filter((group) => group !== this.canvas.selectedShapes);
    this.canvas.shapes = this.canvas.shapes.filter((shape) => !this.canvas.selectedShapes.some((selectedShape) => selectedShape === shape));
    this.canvas.clear();
    this.canvas.redraw();
  }

  private group(): void {
    if (this.canvas.selectedShapes.length <= 1) return;
    if (this.canvas.groups.some((group) => group === this.canvas.selectedShapes)) return;
    this.canvas.groups.push(this.canvas.selectedShapes);
  }

  private ungroup(): void {
    this.canvas.groups = this.canvas.groups.filter((group) => group !== this.canvas.selectedShapes);
  }
}
