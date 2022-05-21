interface Drawable {
  readonly el: Element;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly type: string;
  onCanvasMousedown(e: MouseEvent): void;
  onCanvasMousemove(e: MouseEvent): void;
  onCanvasMouseup(e: MouseEvent): void;
  onCanvasMouseout(e: MouseEvent): void;
  clear(): void;
}

export type { Drawable };
