import { WidgetType } from './enums';
import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import { Shape } from './shapes';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;
  
  private ctx: CanvasRenderingContext2D;

  private widgets: Array<WidgetType> = [
    WidgetType.RECTANGLE,
    WidgetType.ELLIPSE,
  ];

  private widget: Drawable | null = null;

  private shapes: Array<Shape> = [];

  private isDrawing = false;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.initWidgets();
    this.initCanvas();
  }

  initWidgets() {
    this.widgets.forEach((type: string) => {
      const element = document.getElementById(type) as Element;
      const widget = WidgetFactory.create(element, this.ctx) as Drawable;
      element.addEventListener('click', () => this.toggleWidget(widget));
    });
  }

  toggleWidget(widget: Drawable) {
    widget.el.classList.add('selected');
    this.widget?.el.classList.remove('selected');
    this.widget = this.widget?.type === widget.type ? null : widget;
  }

  initCanvas() {
    this.canvas.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      if (this.widget) return;
      this.select(e);
    });
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      this.start();
      this.widget.onCanvasMousedown(e);
    });
    this.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      if (!this.isDrawing) return;
      this.redraw();
      this.widget.onCanvasMousemove(e);
    });
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      const shape = this.widget.onCanvasMouseup(e);
      if (!shape.isShapeless()) this.shapes.push(shape);
      this.stop();
    });
    this.canvas.addEventListener('mouseout', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      if (!this.isDrawing) return;
      const shape = this.widget.onCanvasMouseout(e);
      if (!shape.isShapeless()) this.shapes.push(shape);
      this.stop();
    });
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redraw(): void {
    this.clear();
    this.shapes.forEach((shape) => shape.draw());
  }

  select(e: MouseEvent): void {
    this.clear();
    let index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index >= 0) index = this.shapes.length - index - 1;
    this.shapes.forEach((shape, i) => i !== index && shape.draw());
    if (index >= 0) this.shapes[index].select();
  }

  start() {
    this.isDrawing = true;
  }

  stop() {
    this.isDrawing = false;
  }
}

new App();
