import { Clickable } from './Clickable';
import Canvas from '../canvas';

export default abstract class Tool implements Clickable {
  protected canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;
    document.getElementById(this.id())?.addEventListener('click', (e: MouseEvent) => this.onClick(e));
  }

  abstract id(): string;

  abstract onClick(e: MouseEvent): void;
}
