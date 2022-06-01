import { WidgetType } from './enums';
import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import { Shape } from './shapes';
import {
  SHAPE_FILL_STYLE,
  SHAPE_STROKE_STYLE,
} from './constants';
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
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth - (document.getElementById('bar') as HTMLElement).clientWidth;
    this.canvas.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      if (this.widget) return;
      this.clear();
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
      this.clear();
      this.redraw();
      this.widget.onCanvasMousemove(e);
    });
    this.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      const shape = this.widget.onCanvasMouseup(e);
      shape.setOrder(this.shapes.length);
      if (!shape.isShapeless()) this.shapes.push(shape);
      this.stop();
    });
    this.canvas.addEventListener('mouseout', (e: MouseEvent) => {
      e.preventDefault();
      if (!this.widget) return;
      if (!this.isDrawing) return;
      const shape = this.widget.onCanvasMouseout(e);
      shape.setOrder(this.shapes.length);
      if (!shape.isShapeless()) this.shapes.push(shape);
      this.stop();
    });
    this.ctx.fillStyle = SHAPE_FILL_STYLE;
    this.ctx.strokeStyle = SHAPE_STROKE_STYLE;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  redraw(): void {
    this.shapes.forEach((shape) => shape.draw());
  }

  select(e: MouseEvent): void {
    let index = [...this.shapes].reverse().findIndex((shape) => shape.contains(e.offsetX, e.offsetY));
    if (index < 0) {
      this.shapes.sort((a: Shape, b: Shape) => a.order - b.order).forEach((shape) => shape.draw());
      return;
    }
    const { length } = this.shapes;
    index = length - 1 - index;
    const selected = this.shapes[index];
    this.shapes.splice(index, 1);
    this.shapes.push(selected);
    this.redraw();
    this.shapes[length - 1].select();
  }

  start() {
    this.isDrawing = true;
  }

  stop() {
    this.isDrawing = false;
  }
}

new App();
