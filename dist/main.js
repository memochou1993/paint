"use strict";
class App {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(200,0,0)';
        this.ctx.fillRect(10, 10, 55, 50);
        this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        this.ctx.fillRect(30, 30, 55, 50);
    }
}
new App();
