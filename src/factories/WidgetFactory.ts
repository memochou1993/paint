import { WidgetType } from '../enums';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, ctx: CanvasRenderingContext2D): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, ctx);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, ctx);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, ctx);
      default:
        return null;
    }
  }
}
