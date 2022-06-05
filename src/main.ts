import { WidgetFactory } from './factories';
import Canvas from './canvas';
import { Drawable } from './widgets';
import { FileTool, EditTool, ViewTool } from './tools';
import './style.css';

class App {
  private canvas: Canvas = new Canvas();

  private widget: Drawable | null = null;

  constructor() {
    this.initTools();
    this.initWidgets();
    this.initCanvas();
  }

  private initTools(): void {
    new FileTool(this.canvas);
    new EditTool(this.canvas);
    new ViewTool(this.canvas);
  }

  private initWidgets(): void {
    const elements = document.getElementsByClassName('widget');
    Array.from(elements).forEach((element: Element) => {
      const widget = WidgetFactory.create(element.id, this.canvas) as Drawable;
      element.addEventListener('click', () => this.useWidget(widget));
    });
  }

  private initCanvas(): void {
    this.resizeCanvas();
    this.canvas.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseDown(e);
    });
    this.canvas.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseMove(e);
    });
    this.canvas.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseUp(e);
    });
    this.canvas.canvas.addEventListener('mouseout', (e: MouseEvent) => {
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
    this.canvas.canvas.height = window.innerHeight - ((document.getElementById('header') as HTMLElement).clientHeight);
    this.canvas.canvas.width = window.innerWidth - ((document.getElementById('sidebar') as HTMLElement).clientWidth);
    this.widget?.redraw();
  }
}

new App();
