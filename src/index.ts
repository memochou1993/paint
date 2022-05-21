import { WidgetType } from './enums';
import { WidgetFactory } from './factories';
import { Drawable } from './widgets';
import './style.css';

class App {
  private canvas: HTMLCanvasElement;

  private widgets: Array<string> = [
    WidgetType.RECTANGLE,
    WidgetType.ELLIPSE,
  ];

  private widget: Drawable | null = null;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.initWidgets();
    this.initCanvas();
  }

  initWidgets() {
    this.widgets.forEach((type: string) => {
      const element = document.getElementById(type) as Element;
      const widget = WidgetFactory.create(element, this.canvas) as Drawable;
      element.addEventListener('click', () => this.enableWidget(widget));
    });
  }

  enableWidget(widget: Drawable) {
    widget.el.classList.add('selected');
    this.widget?.el.classList.remove('selected');
    this.widget = this.widget?.name === widget.name ? null : widget;
  }

  initCanvas() {
    this.canvas.addEventListener('click', () => {
      if (this.widget) {
        this.widget.draw();
      }
    });
  }
}

new App();
