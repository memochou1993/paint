import Widget from './Widget';
import { WidgetType } from '../enums';

export default class CursorWidget extends Widget {
  readonly type = WidgetType.CURSOR;

  onCanvasClick(): Promise<void> {
    return new Promise<void>((res) => res());
  }

  onCanvasMousedown(): void {}

  onCanvasMousemove(): void {}

  onCanvasMouseup(): void {}

  onCanvasMouseout(): void {}
}
