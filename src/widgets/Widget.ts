import { Drawable } from './Drawable';
import Store from '../store';

export default abstract class Widget implements Drawable {
  readonly element: Element;

  protected store: Store;
  
  protected isDrawing: boolean = false;

  abstract cursor: string;

  constructor(el: Element, store: Store) {
    this.element = el;
    this.store = store;
  }

  protected setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  clear(): void {
    this.store.ctx.clearRect(0, 0, this.store.canvas.width, this.store.canvas.height);
  }

  redraw(): void {
    this.store.shapes.forEach((shape) => shape.draw());
  }

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
