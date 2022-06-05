import { WidgetType } from '../enums';
import Canvas from '../canvas';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, canvas: Canvas): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, canvas);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, canvas);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, canvas);
      default:
        return null;
    }
  }
}
