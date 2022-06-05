import { WidgetFactory } from './factories';
import Store from './store';
import { Drawable } from './widgets';
import { FileTool, EditTool, ViewTool } from './tools';
import './style.css';

class App {
  private store: Store = new Store();

  private widget: Drawable | null = null;

  constructor() {
    this.initTools();
    this.initWidgets();
    this.initCanvas();
  }

  private initTools(): void {
    new FileTool(this.store);
    new EditTool(this.store);
    new ViewTool(this.store);
  }

  private initWidgets(): void {
    const elements = document.getElementsByClassName('widget');
    Array.from(elements).forEach((element: Element) => {
      const widget = WidgetFactory.create(element, this.store) as Drawable;
      element.addEventListener('click', () => this.useWidget(widget));
    });
  }

  private initCanvas(): void {
    this.resizeCanvas();
    this.store.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseDown(e);
    });
    this.store.canvas.addEventListener('mousemove', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseMove(e);
    });
    this.store.canvas.addEventListener('mouseup', (e: MouseEvent) => {
      e.preventDefault();
      this.widget?.mouseUp(e);
    });
    this.store.canvas.addEventListener('mouseout', (e: MouseEvent) => {
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
    this.store.canvas.height = window.innerHeight - ((document.getElementById('header') as HTMLElement).clientHeight);
    this.store.canvas.width = window.innerWidth - ((document.getElementById('sidebar') as HTMLElement).clientWidth);
    this.widget?.redraw();
  }
}

new App();
