import { Drawable } from './Drawable';
import Canvas from '../canvas';

export default abstract class Widget implements Drawable {
  readonly element: Element;

  protected canvas: Canvas;
  
  protected isDrawing: boolean = false;

  abstract cursor: string;

  constructor(el: Element, canvas: Canvas) {
    this.element = el;
    this.canvas = canvas;
  }

  protected setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  clear(): void {
    this.canvas.ctx.clearRect(0, 0, this.canvas.canvas.width, this.canvas.canvas.height);
  }

  redraw(): void {
    this.canvas.shapes.forEach((shape) => shape.draw());
  }

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
