import { Shape } from '../shapes';

export default class Storage {
  shapes: Shape[] = [];

  selectedShapes: Array<Shape> = [];

  groups: Array<Array<Shape>> = [];
}
