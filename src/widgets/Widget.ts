import { WidgetType } from '../enums';
import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  readonly el: Element;
  
  readonly ctx: CanvasRenderingContext2D;
  
  abstract readonly type: WidgetType;

  constructor(el: Element, ctx: CanvasRenderingContext2D) {
    this.el = el;
    this.ctx = ctx;
  }

  abstract onClick(e: MouseEvent): Promise<Shape | null> | void;

  abstract onMousedown(e: MouseEvent): Promise<Shape | null> | void;

  abstract onMousemove(e: MouseEvent): Promise<Shape | null> | void;

  abstract onMouseup(e: MouseEvent): Promise<Shape | null> | void;

  abstract onMouseout(e: MouseEvent): Promise<Shape | null> | void;
}
