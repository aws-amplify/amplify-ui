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
  @Input() defaultCountryCode: string;
  @Input() dialCodeList: Array<string>;

  public defaultCountryCodeValue: string;
  public countryDialCodesValue = countryDialCodes;
  public textFieldId: string;
  public selectFieldId: string;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    // TODO: consider better default handling mechanisms across frameworks
    if (this.isPhoneField()) {
      const state = this.authenticator.authState;
      const { country_code }: ActorContextWithForms = getActorContext(state);
      this.defaultCountryCodeValue = this.defaultCountryCode ?? country_code;
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
    return translate(validationError[this.name] as string);
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
}
