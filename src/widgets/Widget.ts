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
    this.initExtensions();
  }

  private initExtensions(): void {
    document.getElementById('group')?.addEventListener('click', () => this.group());
    document.getElementById('ungroup')?.addEventListener('click', () => this.ungroup());
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

  protected group(): void {}

  protected ungroup(): void {}

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
