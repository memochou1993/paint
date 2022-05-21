import { WidgetType } from '../enums';
import Widget from './Widget';

export default class Rectangle extends Widget {
  readonly type = WidgetType.RECTANGLE;

  draw(): void {
    console.log('draw rectangle...');
  }
}
