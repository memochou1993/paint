import { WidgetType } from '../enums';
import Store from '../store';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, canvas: HTMLCanvasElement, store: Store): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, canvas, store);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, canvas, store);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, canvas, store);
      default:
        return null;
    }
  }
}
