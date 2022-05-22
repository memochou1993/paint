import { Shape } from '../shapes';

interface Drawable {
  type: string;
  el: Element;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  offsetX: number;
  offsetY: number;
  shapes: Array<Shape>;
  clear(): void;
  onCanvasMousedown(e: MouseEvent): void;
  onCanvasMousemove(e: MouseEvent): void;
  onCanvasMouseup(e: MouseEvent): Shape;
  onCanvasMouseout(e: MouseEvent): Shape;
}

export type { Drawable };
