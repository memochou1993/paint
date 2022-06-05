import { WidgetType } from '../enums';
import Store from '../store';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, store: Store): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, store);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, store);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, store);
      default:
        return null;
    }
  }
}
