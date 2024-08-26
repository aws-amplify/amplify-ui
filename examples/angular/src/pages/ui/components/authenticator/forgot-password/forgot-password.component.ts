import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
