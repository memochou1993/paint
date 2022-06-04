import { Drawable } from './Drawable';
import Storage from '../storage';

export default abstract class Widget implements Drawable {
  readonly element: Element;

  readonly canvas: HTMLCanvasElement;
  
  readonly ctx: CanvasRenderingContext2D;

  protected storage: Storage;
  
  protected isDrawing: boolean = false;

  abstract cursor: string;

  constructor(el: Element, canvas: HTMLCanvasElement, storage: Storage) {
    this.element = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.storage = storage;
  }

  protected setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redraw(): void {
    this.storage.shapes.forEach((shape) => shape.draw());
  }

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
