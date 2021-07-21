import { Component, Input } from '@angular/core';
import {
  InputType,
  getAttributeMap,
  AttributeInfo,
  isInputType,
} from '../../common';
import { StateMachineService } from '../../services';

/**
 * Contains an input element and its label. Intended to be used with
 * Angular Reactive Form
 */
@Component({
  selector: 'amplify-input',
  templateUrl: './amplify-input.component.html',
})
export class AmplifyInputComponent {
  @Input() name: string;
  // TODO: Separate entry for id
  @Input() type: InputType;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() initialValue = '';
  @Input() disabled = false;

  constructor(private stateMachine: StateMachineService) {}

  get attributeMap(): Record<string, AttributeInfo> {
    return getAttributeMap();
  }

  get error(): string {
    const { validationError } = this.stateMachine.context;
    return validationError[this.name];
  }

  // infers what the `type` of underlying input element should be.
  inferInputType(): InputType {
    if (this.type) {
      // if type is explicitly defined, use that.
      return this.type;
    } else if (this.name && isInputType(this.name)) {
      // if the input name is also a valid input type, use that.
      // e.g. type of <input name="password"> will be password.
      return this.name;
    } else {
      return 'text';
    }
  }
}
