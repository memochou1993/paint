import { Shape } from '../shapes';

export default class Canvas {
  canvas: HTMLCanvasElement;

  ctx: CanvasRenderingContext2D;

  shapes: Shape[] = [];

  selectedShapes: Array<Shape> = [];

  groups: Array<Array<Shape>> = [];

  onMouseDown: Function = () => {};

  onMouseMove: Function = () => {};

  onMouseUp: Function = () => {};

  onMouseOut: Function = () => {};

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  private init(): void {
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.onMouseDown(e);
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      this.onMouseMove(e);
    });
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      this.onMouseUp(e);
    });
    this.canvas.addEventListener('mouseout', (e: MouseEvent) => {
      e.preventDefault();
      this.onMouseOut(e);
    });
  }

  resize(): void {
    this.canvas.height = window.innerHeight - ((document.getElementById('header') as HTMLElement).clientHeight);
    this.canvas.width = window.innerWidth - ((document.getElementById('sidebar') as HTMLElement).clientWidth);
  }
}
