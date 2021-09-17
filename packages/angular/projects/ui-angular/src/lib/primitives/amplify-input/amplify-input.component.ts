import { Component, Input } from '@angular/core';
import {
  ActorContextWithForms,
  AuthInputAttributes,
  getActorContext,
  translate,
} from '@aws-amplify/ui';
import { getAttributeMap } from '../../common';
import { StateMachineService } from '../../services/state-machine.service';

/**
 * Contains an input element and its label. Intended to be used with
 * Angular Reactive Form
 */
@Component({
  selector: 'amplify-form-input',
  templateUrl: './amplify-input.component.html',
})
export class AmplifyInputComponent {
  @Input() name: string;
  // TODO: Separate entry for id
  @Input() type: string;
  @Input() required = true;
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
    const formContext: ActorContextWithForms = getActorContext(
      this.stateMachine.authState
    );
    const { validationError } = formContext;
    return validationError[this.name];
  }

  inferLabel(): string {
    const label = this.label || this.attributeMap[this.name]?.label;
    return translate<string>(label);
  }

  inferPlaceholder(): string {
    const placeholder =
      this.placeholder ||
      this.attributeMap[this.name]?.placeholder ||
      this.inferLabel();
    return translate<string>(placeholder);
  }

  // infers what the `type` of underlying input element should be.
  inferType(): string {
    return this.type ?? this.attributeMap[this.name]?.type ?? 'text';
  }
}
