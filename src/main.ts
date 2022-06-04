import { WidgetFactory } from './factories';
import Storage from './storage';
import { Drawable } from './widgets';
import { ExtensionRegister } from './extensions';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;

  private storage: Storage = new Storage();

  private widget: Drawable | null = null;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    new ExtensionRegister(this.storage);
    this.initWidgets();
    this.initCanvas();
  }

  private initWidgets(): void {
    const elements = document.getElementsByClassName('widget');
    Array.from(elements).forEach((element: Element) => {
      const widget = WidgetFactory.create(element, this.canvas, this.storage) as Drawable;
      element.addEventListener('click', () => this.useWidget(widget));
    });
  }

  private initCanvas(): void {
    this.resizeCanvas();
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

  private useWidget(widget: Drawable): void {
    this.widget?.element.classList.remove('selected');
    this.widget = widget;
    this.widget.element.classList.add('selected');
    document.body.style.cursor = this.widget.cursor || 'default';
  }

  private resizeCanvas(): void {
    this.canvas.height = window.innerHeight - ((document.getElementById('header') as HTMLElement).clientHeight);
    this.canvas.width = window.innerWidth - ((document.getElementById('sidebar') as HTMLElement).clientWidth);
    this.widget?.redraw();
  }
}

new App();
