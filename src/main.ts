class App {
  private canvas:  HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private rectangle: Element;

  private ellipse: Element;

  private selectedObject: Element | null = null;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.rectangle = document.getElementById('rectangle') as Element;
    this.ellipse = document.getElementById('ellipse') as Element;
    this.init();
  }

  init() {
    this.canvas?.addEventListener('click', (e) => this.handleCanvasClick(e));
    this.rectangle?.addEventListener('click', (e) => this.handleRectangleClick(e));
    this.ellipse?.addEventListener('click', (e) => this.handleEllipseClick(e));
  }

  handleCanvasClick(e: MouseEvent) {
    const rect = this.canvas?.getBoundingClientRect() as DOMRect;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    switch (this.selectedObject?.id) {
      case 'rectangle':
        this.ctx.strokeRect(x, y, 100, 100);
        break;
      case 'ellipse':
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, 75, 100, Math.PI / 2, 0, 2 * Math.PI);
        this.ctx.stroke();
        break;
      default:
        break;
    }
    this.clearSelection();
  }

  handleRectangleClick(e: Event) {
    const el = e.target as Element;
    this.toggleSelection(el);
  }

  handleEllipseClick(e: Event) {
    const el = e.target as Element;
    this.toggleSelection(el);
  }

  toggleSelection(el: Element) {
    const { classList } = el;
    if (classList.contains('selected')) {
      this.clearSelection();
      return;
    }
    this.clearSelection();
    classList.add('selected');
    this.selectedObject = el;
  }

  clearSelection() {
    Array.from(document.getElementsByClassName('object')).forEach((el) => el.classList.remove('selected'));
    this.selectedObject = null;
  }
}

new App();
