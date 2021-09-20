import { Component, Input, OnInit } from '@angular/core';
import {
  ActorContextWithForms,
  AuthInputAttributes,
  getActorContext,
  translate,
  countryDialCodes,
} from '@aws-amplify/ui';
import { getAttributeMap } from '../../common';
import { StateMachineService } from '../../services/state-machine.service';

/**
 * Input interface opinionated for authenticator usage.
 *
 * TODO: Separate this component out to two parts -- 1) amplify-auth-input that
 * contains authenticator opionated logic and 2) amplify-base-input primitive
 * that does not make any auth-related inference.
 */
@Component({
  selector: 'amplify-form-input',
  templateUrl: './amplify-input.component.html',
})
export class AmplifyInputComponent implements OnInit {
  @Input() name: string;
  // TODO: Separate entry for id
  @Input() type: string;
  @Input() required = true;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() initialValue = '';
  @Input() disabled = false;
  @Input() autocomplete = '';
  public defaultCountryCode: string;
  public countryDialCodes = countryDialCodes;

  constructor(private stateMachine: StateMachineService) {}

  ngOnInit(): void {
    const state = this.stateMachine.authState;
    const { country_code }: ActorContextWithForms = getActorContext(state);
    this.defaultCountryCode = country_code;

    // TODO: consider better default handling mechanisms across frameworks
    if (this.isTelInput()) {
      this.stateMachine.send({
        type: 'CHANGE',
        data: { name: 'country_code', value: country_code },
      });
    }
  }

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

  isTelInput(): boolean {
    return this.inferType() === 'tel';
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
