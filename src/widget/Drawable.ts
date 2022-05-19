interface Drawable {
  readonly name: string;
  readonly el: Element;
  draw(): void;
}

export type { Drawable };
