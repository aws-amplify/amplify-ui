import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';

const $COMPONENT_SELECTOR: string = '[amplify-heading]';
@Component({
  selector: $COMPONENT_SELECTOR,
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmplifyHeadingComponent extends AmplifyBasePrimitiveComponent {
  /** Input Prop for style changes  */
  @Input() level: number;

  @HostBinding('class') get classNamesProp() {
    const classNames = require('classnames');
    return classNames({
      [`amplify-heading amplify-heading--${this.level}`]: this.level,
    });
  }
}
