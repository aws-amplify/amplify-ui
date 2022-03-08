import { Component, Input } from '@angular/core';
import {
  ActorContextWithForms,
  getActorContext,
  translate,
  countryDialCodes,
  FormField,
} from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-form-field',
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() name: string; // name of the input field
  @Input() formField: FormField; // form field options for this field

  public defaultCountryCodeValue: string;
  public countryDialCodesValue = countryDialCodes;

  constructor(private authenticator: AuthenticatorService) {}

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

  isPasswordField(): boolean {
    return this.formField.type === 'password';
  }

  isPhoneField(): boolean {
    return this.formField.type === 'tel';
  }
}
