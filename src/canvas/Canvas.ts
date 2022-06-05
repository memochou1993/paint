import { Shape } from '../shapes';

export default class Canvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  shapes: Shape[] = [];

  selectedShapes: Array<Shape> = [];

  groups: Array<Array<Shape>> = [];

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
