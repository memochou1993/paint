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
      element.addEventListener('click', () => this.toggleWidget(widget));
    });
  }

  private initCanvas(): void {
    this.resizeCanvas();
    this.canvas.addEventListener('click', (e: MouseEvent) => {
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
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseUp(e);
    });
    this.canvas.addEventListener('mouseout', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseOut(e);
    });
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private toggleWidget(widget: Drawable): void {
    this.widget?.element.classList.remove('selected');
    this.widget = this.widget?.element.id === widget.element.id ? null : widget;
    this.widget?.element.classList.add('selected');
  }

  private resizeCanvas(): void {
    this.canvas.height = window.innerHeight - ((document.getElementById('header') as HTMLElement).clientHeight);
    this.canvas.width = window.innerWidth - ((document.getElementById('sidebar') as HTMLElement).clientWidth);
  }
}

new App();
