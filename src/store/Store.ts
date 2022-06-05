import { Shape } from '../shapes';

export default class Store {
  shapes: Shape[] = [];

  selectedShapes: Array<Shape> = [];

  groups: Array<Array<Shape>> = [];
}
