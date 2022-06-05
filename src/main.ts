import { WidgetFactory } from './factories';
import Canvas from './canvas';
import { Drawable } from './widgets';
import { FileTool, EditTool, ViewTool } from './tools';
import './style.css';

class App {
  private canvas: Canvas = new Canvas();

  private widget: Drawable | null = null;

  constructor() {
    this.initWindow();
    this.initTools();
    this.initWidgets();
    this.initCanvas();
  }

  private initWindow(): void {
    window.addEventListener('resize', () => this.resizeCanvas());
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
    this.canvas.resize();
    this.canvas.onMouseDown = (e: MouseEvent) => this.widget?.mouseDown(e);
    this.canvas.onMouseMove = (e: MouseEvent) => this.widget?.mouseMove(e);
    this.canvas.onMouseUp = (e: MouseEvent) => this.widget?.mouseUp(e);
    this.canvas.onMouseOut = (e: MouseEvent) => this.widget?.mouseOut(e);
  }

  private useWidget(widget: Drawable): void {
    this.widget?.element.classList.remove('selected');
    this.widget = widget;
    this.widget.element.classList.add('selected');
    document.body.style.cursor = this.widget.cursor;
  }

  private resizeCanvas(): void {
    this.canvas.resize();
    this.canvas.redraw();
  }
}

new App();
