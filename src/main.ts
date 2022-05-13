class App {
  private canvas:  HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;

  constructor() {
    this.canvas = document.getElementById('main') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    if (this.ctx) {
      this.ctx.fillStyle = "rgb(200,0,0)";
      this.ctx.fillRect (10, 10, 55, 50);
      this.ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
      this.ctx.fillRect (30, 30, 55, 50);
    }
  }
}

new App();
