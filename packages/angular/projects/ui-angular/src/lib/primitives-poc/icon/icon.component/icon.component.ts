import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
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
  @Input() viewBox: { width: number; height: number };
  get getViewBox() {
    return '0 0 24 24';
  }

  constructor() {
    super();
  }
}
