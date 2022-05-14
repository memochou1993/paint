"use strict";
class App {
    constructor() {
        this.selectedObject = null;
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.rectangle = document.getElementById('rectangle');
        this.ellipse = document.getElementById('ellipse');
        this.init();
    }
    init() {
        var _a, _b, _c;
        (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => this.handleCanvasClick(e));
        (_b = this.rectangle) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => this.handleRectangleClick(e));
        (_c = this.ellipse) === null || _c === void 0 ? void 0 : _c.addEventListener('click', (e) => this.handleEllipseClick(e));
    }
    handleCanvasClick(e) {
        var _a, _b;
        const rect = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        switch ((_b = this.selectedObject) === null || _b === void 0 ? void 0 : _b.id) {
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
    handleRectangleClick(e) {
        const el = e.target;
        this.toggleSelection(el);
    }
    handleEllipseClick(e) {
        const el = e.target;
        this.toggleSelection(el);
    }
    toggleSelection(el) {
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
