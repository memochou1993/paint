import { WidgetType } from '../enums';
import { Shape } from '../shapes';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(element: Element, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shapes: Array<Shape>): Drawable | null {
    switch (element.id) {
      case WidgetType.Cursor:
        return new CursorWidget(element, canvas, ctx, shapes);
      case WidgetType.Rectangle:
        return new RectangleWidget(element, canvas, ctx, shapes);
      case WidgetType.Ellipse:
        return new EllipseWidget(element, canvas, ctx, shapes);
      default:
        return null;
    }
  }
}
