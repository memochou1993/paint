import { WidgetType } from '../enum';
import {
  Drawable,
  Rectangle,
  Ellipse,
} from '../widget';

export default class WidgetFactory {
  static create(element: Element, canvas: HTMLCanvasElement): Drawable | null {
    switch (element.id) {
      case WidgetType.RECTANGLE:
        return new Rectangle(element, canvas);
      case WidgetType.ELLIPSE:
        return new Ellipse(element, canvas);
      default:
        return null;
    }
  }
}
