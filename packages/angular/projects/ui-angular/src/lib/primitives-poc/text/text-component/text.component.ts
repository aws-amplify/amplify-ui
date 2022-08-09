import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyBasePrimitiveComponent } from '../../base-primitive/components/base-primitive.component';

const $COMPONENT_SELECTOR: string = '[amplify-text-poc]';
@Component({
  selector: $COMPONENT_SELECTOR,
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/** Base primitive for property binding */
export class AmplifyTextComponent extends AmplifyBasePrimitiveComponent {
  /** Input Prop for style changes  */

  @Input() variation: string = 'primary';
  @HostBinding('data-variation') get getVariation() {
    return this.variation ? '' : null;
  }
  /** The classes to attach to the element. */
  @HostBinding('class')
  get elementClasses() {
    return {
      'amplify-text': true,
      [`amplify-text--${this.variation}`]: true,
    };
  }
}
