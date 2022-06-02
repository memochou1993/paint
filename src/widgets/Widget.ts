import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  readonly element: Element;

  readonly canvas: HTMLCanvasElement;
  
  readonly ctx: CanvasRenderingContext2D;
  
  readonly shapes: Array<Shape>;

  constructor(el: Element, canvas: HTMLCanvasElement, shapes: Array<Shape>) {
    this.element = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.shapes = shapes;
  }

  protected clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected redraw(): void {
    this.shapes.forEach((shape) => shape.draw());
  }

  abstract click(e: MouseEvent): void;

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
