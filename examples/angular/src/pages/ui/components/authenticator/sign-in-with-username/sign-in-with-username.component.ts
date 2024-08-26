import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-username-no-attributes/${process.env.PATH}`
  )
).default;

@Component({
  selector: 'sign-in-with-username',
  templateUrl: 'sign-in-with-username.component.html',
})
export class SignInWithUsernameComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
