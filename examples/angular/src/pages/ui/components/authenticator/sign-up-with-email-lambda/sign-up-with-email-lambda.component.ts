import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-email-lambda-signup-trigger/${process.env.PATH}`
  )
).default;

@Component({
  selector: 'sign-up-with-email-lambda',
  templateUrl: 'sign-up-with-email-lambda.component.html',
})
export class SignUpWithEmailLambdaComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
