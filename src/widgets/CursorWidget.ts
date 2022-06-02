import Widget from './Widget';
import { WidgetType } from '../enums';

export default class CursorWidget extends Widget {
  readonly type = WidgetType.Cursor;

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
