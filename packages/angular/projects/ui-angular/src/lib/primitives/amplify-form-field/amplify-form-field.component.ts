import { Component, Input, OnInit } from '@angular/core';
import {
  ActorContextWithForms,
  AuthInputAttributes,
  getActorContext,
  translate,
  countryDialCodes,
} from '@aws-amplify/ui';
import { nanoid } from 'nanoid';
import { getAttributeMap } from '../../common';
import { AuthenticatorService } from '../../services/state-machine.service';

/**
 * Input interface opinionated for authenticator usage.
 *
 * TODO: Separate this component out to two parts -- 1) amplify-auth-input that
 * contains authenticator opinionated logic and 2) amplify-text-field primitive
 * that does not make any auth-related inference.
 */
@Component({
  selector: 'amplify-form-field',
  templateUrl: './amplify-form-field.component.html',
})
export class AmplifyFormFieldComponent implements OnInit {
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
  public textFieldId: string;
  public selectFieldId: string;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    // TODO: field primtiives should have generate these by default.
    this.textFieldId = `amplify-field-${nanoid(12)}`;
    this.selectFieldId = `amplify-field-${nanoid(12)}`;

    // TODO: consider better default handling mechanisms across frameworks
    if (this.isPhoneField()) {
      const state = this.authenticator.authState;
      const { country_code }: ActorContextWithForms = getActorContext(state);
      this.defaultCountryCode = country_code;

      // TODO: remove this side-effect
      this.authenticator.send({
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
      this.authenticator.authState
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

  // TODO(enhancement): use enum to differentiate special field types
  isPasswordField(): boolean {
    return this.inferType() === 'password';
  }

  isPhoneField(): boolean {
    return this.inferType() === 'tel';
  }
}
