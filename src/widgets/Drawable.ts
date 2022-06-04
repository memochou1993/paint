interface Drawable {
  readonly element: Element;
  mouseDown(e: MouseEvent): void;
  mouseMove(e: MouseEvent): void;
  mouseUp(e: MouseEvent): void;
  mouseOut(e: MouseEvent): void;
}

export type { Drawable };
