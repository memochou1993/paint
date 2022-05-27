import { Shape } from '../shapes';

interface Drawable {
  type: string;
  el: Element;
  ctx: CanvasRenderingContext2D;
  onCanvasMousedown(e: MouseEvent): void;
  onCanvasMousemove(e: MouseEvent): void;
  onCanvasMouseup(e: MouseEvent): Shape;
  onCanvasMouseout(e: MouseEvent): Shape;
}

export type { Drawable };
