import Widget from './Widget';
import { WidgetType } from '../enums';

export default class CursorWidget extends Widget {
  readonly type = WidgetType.Cursor;

  onClick(): Promise<null> {
    return new Promise((res) => res(null));
  }

  onMousedown(): void {}

  onMousemove(): void {}

  onMouseup(): void {}

  onMouseout(): void {}
}
