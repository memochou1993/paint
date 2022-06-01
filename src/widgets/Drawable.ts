import { Shape } from '../shapes';

interface Drawable {
  type: string;
  el: Element;
  ctx: CanvasRenderingContext2D;
  onCanvasClick(e: MouseEvent): Promise<void> | void;
  onCanvasMousedown(e: MouseEvent): void;
  onCanvasMousemove(e: MouseEvent): void;
  onCanvasMouseup(e: MouseEvent): Shape | void;
  onCanvasMouseout(e: MouseEvent): Shape | void;
}

export type { Drawable };
