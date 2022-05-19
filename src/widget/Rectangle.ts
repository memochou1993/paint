import { WidgetType } from '../enum';
import Widget from './Widget';
import { Drawable } from './Drawable';

export default class Rectangle extends Widget implements Drawable {
  readonly name = WidgetType.RECTANGLE;

  draw(): void {
    // TODO
    console.log('draw rectangle...');
  }
}
