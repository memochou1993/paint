import { WidgetType } from '../enums';
import Widget from './Widget';

export default class Ellipse extends Widget {
  readonly type = WidgetType.ELLIPSE;

  draw(): void {
    console.log('draw ellipse...');
  }
}
