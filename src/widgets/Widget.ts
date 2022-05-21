import { WidgetType } from '../enums';
import { Drawable } from './Drawable';

export default abstract class Widget implements Drawable {
  readonly el: Element;
  
  readonly canvas: HTMLCanvasElement;

  readonly ctx: CanvasRenderingContext2D;

  abstract readonly type: WidgetType;

  constructor(el: Element, canvas: HTMLCanvasElement) {
    this.el = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  draw(): void {}
}
