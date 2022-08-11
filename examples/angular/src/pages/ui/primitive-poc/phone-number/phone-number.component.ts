import { Component } from '@angular/core';

@Component({
  selector: 'amplify-phone-field-demo',
  templateUrl: 'phone-number.component.html',
})
export class AmplifyPhoneNumberFieldExampleComponent {
  /** This method will fire if we select the country code
   * and give the selected country code. */
  onCountryCodeChange(value: string) {}
}
