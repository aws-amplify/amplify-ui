import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-totp-and-sms-mfa/${process.env.PATH}`
  )
).default;

@Component({
  selector: 'sign-in-totp-sms',
  templateUrl: 'sign-in-totp-sms.component.html',
})
export class SignInTOTPSMSComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
