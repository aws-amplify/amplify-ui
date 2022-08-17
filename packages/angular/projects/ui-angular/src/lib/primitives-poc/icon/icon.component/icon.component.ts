import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';

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
  public set viewBox(viewBox: { width: string; height: string }) {
    this._viewBox = ' 0 0 ' + viewBox.width + ' ' + viewBox.height;
  }

  constructor() {
    super();
  }
}
