import Widget from './Widget';

export default class CursorWidget extends Widget {
  onClick(e: MouseEvent): void {
    this.redraw();
    const index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return;
    this.shapes[this.shapes.length - index - 1].select();
  }

  onMousedown(): void {}

  onMousemove(): void {}

  onMouseup(): void {}

  onMouseout(): void {}
}
