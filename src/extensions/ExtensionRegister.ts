import Storage from '../storage';
import EditExtension from './EditExtension';

export default class ExtensionRegister {
  constructor(storage: Storage) {
    new EditExtension(storage);
  }
}
