class App {
  private canvas:  HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.init();
  }

  init() {
    document.getElementById('rectangle')?.addEventListener('click', (e) => {
      this.toggleSelection(e.target as Element);
    });
    document.getElementById('ellipse')?.addEventListener('click', (e) => {
      this.toggleSelection(e.target as Element);
    });
  }

  toggleSelection(el: Element) {
    const { classList } = el;
    if (classList.contains('selected')) {
      this.clearSelection();
      return;
    }
    this.clearSelection();
    classList.add('selected');
  }

  clearSelection() {
    Array.from(document.getElementsByClassName('object')).forEach((el) => el.classList.remove('selected'));
  }
}

new App();
