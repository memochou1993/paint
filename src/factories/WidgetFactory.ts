import { WidgetType } from '../enums';
import { Shape } from '../shapes';
import {
  Drawable,
  CursorWidget,
  RectangleWidget,
  EllipseWidget,
} from '../widgets';

export default class WidgetFactory {
  static create(el: Element, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shapes: Array<Shape>): Drawable | null {
    switch (el.id) {
      case WidgetType.Cursor:
        return new CursorWidget(el, canvas, ctx, shapes);
      case WidgetType.Rectangle:
        return new RectangleWidget(el, canvas, ctx, shapes);
      case WidgetType.Ellipse:
        return new EllipseWidget(el, canvas, ctx, shapes);
      default:
        return null;
    }
  }
}
