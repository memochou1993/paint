import { WidgetType } from '../enums';
import Widget from './Widget';
import { Drawable } from './Drawable';

export default class Ellipse extends Widget implements Drawable {
  readonly name = WidgetType.ELLIPSE;

  draw(): void {
    // TODO
    console.log('draw ellipse...');
  }
}
