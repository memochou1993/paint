import { Drawable } from './Drawable';
import Canvas from '../canvas';

export default abstract class Widget implements Drawable {
  abstract element: Element;

  abstract cursor: string;

  protected canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  abstract mouseDown(e: MouseEvent): void;

  abstract mouseMove(e: MouseEvent): void;

  abstract mouseUp(e: MouseEvent): void;

  abstract mouseOut(e: MouseEvent): void;
}
