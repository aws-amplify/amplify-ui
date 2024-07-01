import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-totp-mfa/${process.env.PATH}`)
).default;

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
