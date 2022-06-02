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

  private initWidgets() {
    this.widgets.forEach((type: string) => {
      const element = document.getElementById(type) as Element;
      const widget = WidgetFactory.create(element, this.canvas, this.ctx, this.shapes) as Drawable;
      element.addEventListener('click', () => this.toggleWidget(widget));
    });
  }

  private toggleWidget(widget: Drawable) {
    widget.el.classList.add('selected');
    this.widget?.el.classList.remove('selected');
    this.widget = this.widget?.type === widget.type ? null : widget;
  }

  private initCanvas() {
    this.canvas.addEventListener('click', async (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return this.redraw();
      // FIXME
      const res = await this.widget.onClick(e);
      if (res !== undefined) {
        this.redraw();
        this.select(e);
      }
    });
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.onMousedown(e);
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.onMousemove(e);
    });
    this.canvas.addEventListener('mouseup', async (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.onMouseup(e);
    });
    this.canvas.addEventListener('mouseout', async (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.onMouseout(e);
    });
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth - (document.getElementById('bar') as HTMLElement).clientWidth;
    this.ctx.lineWidth = ShapeStyle.LINE_WIDTH;
    this.ctx.fillStyle = ShapeStyle.FILL_COLOR;
    this.ctx.strokeStyle = ShapeStyle.STROKE_COLOR;
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private redraw(): void {
    this.clear();
    this.shapes.forEach((shape) => shape.draw());
  }

  private select(e: MouseEvent): void {
    const index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) return;
    this.shapes[this.shapes.length - index - 1].select();
  }
}

new App();
