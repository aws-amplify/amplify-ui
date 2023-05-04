import { Component, Input } from '@angular/core';
import {
  translate,
  countryDialCodes,
  FormFieldOptions,
  getErrors,
} from '@aws-amplify/ui';
import { nanoid } from 'nanoid';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-form-field',
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() name: string; // name of the input field
  @Input() formField: FormFieldOptions; // form field options for this field

  public defaultCountryCodeValue: string;
  public countryDialCodesValue = countryDialCodes;
  public errorId = nanoid(12);

  constructor(private authenticator: AuthenticatorService) {}

  get ariaDescribedBy(): string | undefined {
    return this.hasError() ? this.errorId : undefined;
  }

  get errors(): string[] {
    const { validationErrors } = this.authenticator;
    return getErrors(validationErrors[this.name]);
  }

  public onBlur($event: Event): void {
    const { name } = <HTMLInputElement>$event.target;

    this.authenticator.updateBlur({ name });
  }

  isPasswordField(): boolean {
    return this.formField.type === 'password';
  }

  isPhoneField(): boolean {
    return this.formField.type === 'tel';
  }

  hasError(): boolean {
    return this.errors?.length > 0;
  }

  translate(phrase: string): string {
    return translate<string>(phrase);
  }
}
