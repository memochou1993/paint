import { Shape } from '../shapes';

interface Drawable {
  readonly el: Element;
  readonly type: string;
  onClick(e: MouseEvent): Promise<Shape | null> | void;
  onMousedown(e: MouseEvent): Promise<Shape | null> | void;
  onMousemove(e: MouseEvent): Promise<Shape | null> | void;
  onMouseup(e: MouseEvent): Promise<Shape | null> | void;
  onMouseout(e: MouseEvent): Promise<Shape | null> | void;
}

export type { Drawable };
