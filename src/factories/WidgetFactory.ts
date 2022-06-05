import { WidgetType } from '../enums';
import Canvas from '../canvas';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(type: string, canvas: Canvas): Drawable | null {
    switch (type) {
      case WidgetType.Cursor:
        return new CursorWidget(canvas);
      case WidgetType.Rectangle:
        return new RectangleWidget(canvas);
      case WidgetType.Ellipse:
        return new EllipseWidget(canvas);
      default:
        return null;
    }
  }
}
