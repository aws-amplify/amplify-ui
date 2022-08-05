import { Component } from '@angular/core';

@Component({
  selector: 'amplify-phone-field-demo',
  templateUrl: 'phone-number.component.html',
})
export class AmplifyPhoneNumberFieldExampleComponent {
  onCountryCodeChange(value: string) {
    alert(' Selected value : ' + value);
  }
}
