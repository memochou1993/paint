"use strict";
class App {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    init() {
        var _a, _b;
        (_a = document.getElementById('rectangle')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            this.toggleSelection(e.target);
        });
        (_b = document.getElementById('ellipse')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', (e) => {
            this.toggleSelection(e.target);
        });
    }
    toggleSelection(el) {
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
