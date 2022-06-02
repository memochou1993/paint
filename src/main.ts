import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import { Shape } from './shapes';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;
  
  private shapes: Array<Shape> = [];

  private widget: Drawable | null = null;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.initWidgets();
    this.initCanvas();
  }

  private initWidgets(): void {
    const elements = document.getElementsByClassName('widget');
    Array.from(elements).forEach((element: Element) => {
      const widget = WidgetFactory.create(element, this.canvas, this.shapes) as Drawable;
      element.addEventListener('click', () => {
        this.widget?.element.classList.remove('selected');
        this.widget = this.widget?.element.id === widget.element.id ? null : widget;
        this.widget?.element.classList.add('selected');
      });
    });
  }

  private initCanvas(): void {
    this.canvas.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.click(e);
    });
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseDown(e);
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseMove(e);
    });
    this.canvas.addEventListener('mouseup', async (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseUp(e);
    });
    this.canvas.addEventListener('mouseout', async (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseOut(e);
    });
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth - (document.getElementById('bar') as HTMLElement).clientWidth;
  }
}

new App();
