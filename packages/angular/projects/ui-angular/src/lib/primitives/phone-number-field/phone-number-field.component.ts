import { Component, Input } from '@angular/core';
import { countryDialCodes } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-phone-number-field',
  templateUrl: './phone-number-field.component.html',
})
export class PhoneNumberFieldComponent {
  @Input() autocomplete = 'new-password';
  @Input() disabled = false;
  @Input() defaultCountryCode: string;
  @Input() selectFieldId: string;
  @Input() textFieldId: string;
  @Input() initialValue = '';
  @Input() label = '';
  @Input() name: string;
  @Input() placeholder = '';
  @Input() required = true;
  @Input() type: string;
  public countryDialCodes = countryDialCodes;
}
