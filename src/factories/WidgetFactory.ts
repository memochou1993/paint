import { WidgetType } from '../enums';
import Storage from '../storage';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, canvas: HTMLCanvasElement, storage: Storage): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, canvas, storage);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, canvas, storage);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, canvas, storage);
      default:
        return null;
    }
  }
}
