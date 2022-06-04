import Storage from '../storage';

export default class EditExtension {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
    this.init();
  }

  private init(): void {
    document.getElementById('group')?.addEventListener('click', () => this.group());
    document.getElementById('ungroup')?.addEventListener('click', () => this.ungroup());
  }

  private group(): void {
    if (this.storage.selectedShapes.length <= 1) return;
    if (this.storage.groups.some((group) => group === this.storage.selectedShapes)) return;
    this.storage.groups.push(this.storage.selectedShapes);
  }

  private ungroup(): void {
    this.storage.groups = this.storage.groups.filter((group) => group !== this.storage.selectedShapes);
  }
}
