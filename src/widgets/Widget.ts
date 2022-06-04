import { Drawable } from './Drawable';
import { Shape } from '../shapes';

export default abstract class Widget implements Drawable {
  readonly element: Element;

  readonly canvas: HTMLCanvasElement;
  
  readonly ctx: CanvasRenderingContext2D;
  
  readonly shapes: Array<Shape>;

  protected isDrawing: boolean = false;

  abstract cursor: string;

  constructor(el: Element, canvas: HTMLCanvasElement, shapes: Array<Shape>) {
    this.element = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.shapes = shapes;
    this.initExtensions();
  }

  private initExtensions(): void {
    document.getElementById('group')?.addEventListener('click', () => this.onGroup());
    document.getElementById('ungroup')?.addEventListener('click', () => this.onUngroup());
  }

  protected setIsDrawing(isDrawing: boolean): void {
    this.isDrawing = isDrawing;
  }

  protected clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  protected redraw(): void {
    this.shapes.forEach((shape) => shape.draw());
  }

  mouseDown(e: MouseEvent): void {
    this.onMouseDown(e);
  }

  mouseMove(e: MouseEvent): void {
    this.onMouseMove(e);
  }

  mouseUp(e: MouseEvent): void {
    this.onMouseUp(e);
  }

  mouseOut(e: MouseEvent): void {
    this.onMouseOut(e);
  }

  protected onGroup(): void {}

  protected onUngroup(): void {}

  protected abstract onMouseDown(e: MouseEvent): void;

  protected abstract onMouseMove(e: MouseEvent): void;

  protected abstract onMouseUp(e: MouseEvent): void;

  protected abstract onMouseOut(e: MouseEvent): void;
}
