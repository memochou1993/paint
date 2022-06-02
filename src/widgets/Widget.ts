import { WidgetType } from '../enums';
import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  readonly el: Element;

  readonly canvas: HTMLCanvasElement;
  
  readonly ctx: CanvasRenderingContext2D;
  
  readonly shapes: Array<Shape>;
  
  abstract readonly type: WidgetType;

  constructor(el: Element, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, shapes: Array<Shape>) {
    this.el = el;
    this.canvas = canvas;
    this.ctx = ctx;
    this.shapes = shapes;
  }

  protected clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected redraw(): void {
    this.shapes.forEach((shape) => shape.draw());
  }

  abstract onClick(e: MouseEvent): void;

  abstract onMousedown(e: MouseEvent): void;

  abstract onMousemove(e: MouseEvent): void;

  abstract onMouseup(e: MouseEvent): void;

  abstract onMouseout(e: MouseEvent): void;
}
