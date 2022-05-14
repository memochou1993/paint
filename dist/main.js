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
        const clearAll = () => Array.from(document.getElementsByClassName('object')).forEach(({ classList }) => classList.remove('selected'));
        const { classList } = el;
        if (!classList.contains('selected')) {
            clearAll();
        }
        classList.toggle('selected');
    }
}
new App();
