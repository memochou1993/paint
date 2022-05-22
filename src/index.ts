import { WidgetType } from './enums';
import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import { Shape } from './shapes';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;

  private widgets: Array<WidgetType> = [
    WidgetType.RECTANGLE,
    WidgetType.ELLIPSE,
  ];

  private widget: Drawable | null = null;

  private shapes: Array<Shape> = [];

  private isDrawing = false;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.initWidgets();
    this.initCanvas();
  }

  initWidgets() {
    this.widgets.forEach((type: string) => {
      const element = document.getElementById(type) as Element;
      const widget = WidgetFactory.create(element, this.canvas) as Drawable;
      element.addEventListener('click', () => this.toggleWidget(widget));
    });
  }

  toggleWidget(widget: Drawable) {
    widget.el.classList.add('selected');
    this.widget?.el.classList.remove('selected');
    this.widget = this.widget?.type === widget.type ? null : widget;
  }

  initCanvas() {
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
      this.widget.onCanvasMousemove(e);
      this.shapes.forEach((shape) => shape.draw());
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
      const shape = this.widget.onCanvasMouseout(e);
      if (!shape.isShapeless()) this.shapes.push(shape);
      this.stop();
    });
  }

  start() {
    this.isDrawing = true;
  }

  stop() {
    this.isDrawing = false;
  }
}

new App();
