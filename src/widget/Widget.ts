export default abstract class Widget {
  readonly el: Element;
  
  protected canvas: HTMLCanvasElement;
  
  protected ctx: CanvasRenderingContext2D;

  constructor(el: Element, canvas: HTMLCanvasElement) {
    this.el = el;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
