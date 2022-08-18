import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';
import { viewstate } from './type';

const $COMPONENT_SELECTOR: string = 'amplify-icon';
@Component({
  selector: $COMPONENT_SELECTOR,
  templateUrl: 'icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmplifyIconComponent extends AmplifyBasePrimitiveComponent {
  /** Input Prop for style changes  */

  @Input() pathData: string;

  public _viewBox: string = '';
  @Input()
  public set viewBox(viewBox: viewstate) {
    this._viewBox = `0 0  ${viewBox.width} ${viewBox.height}`;
  }

  constructor() {
    super();
  }
}
