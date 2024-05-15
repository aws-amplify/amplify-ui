import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'sign-in-totp-mfa',
  templateUrl: 'sign-in-totp-mfa.component.html',
})
export class SignInTOTPMFAComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
  public formFields = {
    setupTotp: { QR: { totpIssuer: 'My Web App' } },
  };
}
