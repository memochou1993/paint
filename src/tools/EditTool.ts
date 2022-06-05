import Store from '../store';

export default class EditTool {
  private store: Store;

  constructor(store: Store) {
    this.store = store;
    this.init();
  }

  private init(): void {
    document.getElementById('delete')?.addEventListener('click', () => this.delete());
    document.getElementById('group')?.addEventListener('click', () => this.group());
    document.getElementById('ungroup')?.addEventListener('click', () => this.ungroup());
  }

  private delete(): void {
    this.store.shapes = this.store.shapes.filter((shape) => {
      return !this.store.selectedShapes.some((selectedShape) => selectedShape === shape);
    });
    console.log(this.store.shapes);
  }

  private group(): void {
    if (this.store.selectedShapes.length <= 1) return;
    if (this.store.groups.some((group) => group === this.store.selectedShapes)) return;
    this.store.groups.push(this.store.selectedShapes);
  }

  private ungroup(): void {
    this.store.groups = this.store.groups.filter((group) => group !== this.store.selectedShapes);
  }
}
