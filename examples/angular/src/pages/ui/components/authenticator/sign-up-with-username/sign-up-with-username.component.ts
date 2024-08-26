import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-username-no-attributes/${process.env.PATH}`
  )
).default;

@Component({
  selector: 'sign-up-with-username',
  templateUrl: 'sign-up-with-username.component.html',
})
export class SignUpWithUsernameComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
