interface Drawable {
  get element(): Element;
  get cursor(): string;
  mouseDown(e: MouseEvent): void;
  mouseMove(e: MouseEvent): void;
  mouseUp(e: MouseEvent): void;
  mouseOut(e: MouseEvent): void;
}

export type { Drawable };
