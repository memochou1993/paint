import { WidgetType } from '../enum';
import Widget from './Widget';
import { Drawable } from './Drawable';

export default class Ellipse extends Widget implements Drawable {
  readonly name = WidgetType.ELLIPSE;

  draw(): void {
    // TODO
    console.log('draw ellipse...');
  }
}
