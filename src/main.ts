import { WidgetType } from './enums';
import { ShapeStyle } from './constants';
import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import { Shape } from './shapes';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;
  
  private ctx: CanvasRenderingContext2D;

  private widgets: Array<WidgetType> = [
    WidgetType.Cursor,
    WidgetType.Rectangle,
    WidgetType.Ellipse,
  ];

  private widget: Drawable | null = null;

  private shapes: Array<Shape> = [];

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initWidgets();
    this.initCanvas();
  }

  private initWidgets(): void {
    this.widgets.forEach((type: string) => {
      const el = document.getElementById(type) as Element;
      const widget = WidgetFactory.create(el, this.canvas, this.ctx, this.shapes) as Drawable;
      el.addEventListener('click', () => this.toggleWidget(widget));
    });
  }

  private toggleWidget(widget: Drawable): void {
    this.widget?.el.classList.remove('selected');
    this.widget = this.widget?.el.id === widget.el.id ? null : widget;
    this.widget?.el.classList.add('selected');
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
    this.ctx.lineWidth = ShapeStyle.LINE_WIDTH;
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }
}

new App();
