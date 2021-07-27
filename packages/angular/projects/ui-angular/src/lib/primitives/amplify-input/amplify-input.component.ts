import { Component, Input } from '@angular/core';
import { AuthInputAttributes } from '@aws-amplify/ui-core';
import { getAttributeMap } from '../../common';
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
  @Input() type: string;
  @Input() required = false;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() initialValue = '';
  @Input() disabled = false;
  @Input() autocomplete = '';

  constructor(private stateMachine: StateMachineService) {}

  get attributeMap(): AuthInputAttributes {
    return getAttributeMap();
  }

  get error(): string {
    const { validationError } = this.stateMachine.context;
    return validationError[this.name];
  }

  // infers what the `type` of underlying input element should be.
  inferInputType(): string {
    return this.type ?? this.attributeMap[this.name]?.type ?? 'text';
  }
}
