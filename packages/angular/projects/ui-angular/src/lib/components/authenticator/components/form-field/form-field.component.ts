import { Component, Input, OnInit } from '@angular/core';
import {
  ActorContextWithForms,
  AuthInputAttributes,
  getActorContext,
  translate,
  countryDialCodes,
} from '@aws-amplify/ui';
import { getAttributeMap } from '../../../../common';
import { AuthenticatorService } from '../../../../services/authenticator.service';

/**
 * Input interface opinionated for authenticator usage.
 *
 * TODO: Separate this component out to two parts -- 1) amplify-auth-input that
 * contains authenticator opinionated logic and 2) amplify-text-field primitive
 * that does not make any auth-related inference.
 */
@Component({
  selector: 'amplify-form-field',
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent implements OnInit {
  @Input() name: string;
  @Input() type: string;
  @Input() required = true;
  @Input() placeholder = '';
  @Input() label = '';
  @Input() initialValue = '';
  @Input() disabled = false;
  @Input() autocomplete = '';
  @Input() labelHidden = true;

  public defaultCountryCode: string;
  public countryDialCodes = countryDialCodes;
  public textFieldId: string;
  public selectFieldId: string;

  public fullPhoneNumber: {
    country_code: string;
    phone_number?: string;
    username?: string;
  };

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    if (this.isPhoneField()) {
      const state = this.authenticator.authState;
      const { country_code }: ActorContextWithForms = getActorContext(state);
      this.defaultCountryCode = country_code;
      this.fullPhoneNumber = { country_code };
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
    return translate(validationError[this.name]);
  }

  public onBlur($event: Event) {
    let { name } = <HTMLInputElement>$event.target;

    this.authenticator.updateBlur({ name });
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

  inferAutocomplete(): string {
    return this.autocomplete || this.attributeMap[this.name]?.autocomplete;
  }

  // TODO(enhancement): use enum to differentiate special field types
  isPasswordField(): boolean {
    return this.inferType() === 'password';
  }

  isPhoneField(): boolean {
    return this.inferType() === 'tel';
  }

  /**
   * When the field being rendered is for a phone number, this handler is used to prevent change event propagation in
   * order to manually update the state machine with a country code + phone number.
   */
  handlePhoneNumberChange(event: InputEvent) {
    event.stopPropagation();

    const { name, value } = <HTMLInputElement>event.target;
    this.fullPhoneNumber = { ...this.fullPhoneNumber, [name]: value };

    this.authenticator.updateForm({
      name: this.name,
      value: this.fullPhoneNumber.country_code + this.fullPhoneNumber[name],
    });
  }
}
