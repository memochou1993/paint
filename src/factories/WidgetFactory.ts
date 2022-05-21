import { WidgetType } from '../enums';
import {
  Drawable,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, canvas: HTMLCanvasElement): Drawable | null {
    switch (element.id) {
      case WidgetType.RECTANGLE:
        return new RectangleWidget(element, canvas);
      case WidgetType.ELLIPSE:
        return new EllipseWidget(element, canvas);
      default:
        return null;
    }
  }
}
