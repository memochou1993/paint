interface Drawable {
  readonly el: Element;
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly type: string;
  draw(): void;
}

export type { Drawable };
