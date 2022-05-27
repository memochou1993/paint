import { WidgetType } from '../enums';
import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  abstract readonly type: WidgetType;

  readonly el: Element;

  readonly ctx: CanvasRenderingContext2D;

  constructor(el: Element, ctx: CanvasRenderingContext2D) {
    this.el = el;
    this.ctx = ctx;
  }

  abstract onCanvasMousedown(e: MouseEvent): void;

  abstract onCanvasMousemove(e: MouseEvent): void;

  abstract onCanvasMouseup(e: MouseEvent): Shape;

  abstract onCanvasMouseout(e: MouseEvent): Shape;
}
