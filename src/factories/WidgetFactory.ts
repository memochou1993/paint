import { WidgetType } from '../enums';
import {
  Drawable,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, ctx: CanvasRenderingContext2D): Drawable | null {
    switch (element.id) {
      case WidgetType.RECTANGLE:
        return new RectangleWidget(element, ctx);
      case WidgetType.ELLIPSE:
        return new EllipseWidget(element, ctx);
      default:
        return null;
    }
  }
}
