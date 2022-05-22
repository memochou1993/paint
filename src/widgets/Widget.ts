import { WidgetType } from '../enums';
import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  abstract readonly type: WidgetType;

  readonly el: Element;

  readonly canvas: HTMLCanvasElement;

  readonly ctx: CanvasRenderingContext2D;

  readonly offsetX = 0;

  readonly offsetY = 0;

  readonly shapes: Array<Shape> = [];

  constructor(el: Element, canvas: HTMLCanvasElement) {
    this.el = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    const { left, top } = this.canvas.getBoundingClientRect();
    Object.assign(this, { offsetX: left, offsetY: top });
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  abstract onCanvasMousedown(e: MouseEvent): void;

  abstract onCanvasMousemove(e: MouseEvent): void;

  abstract onCanvasMouseup(e: MouseEvent): Shape;

  abstract onCanvasMouseout(e: MouseEvent): Shape;
}
