import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(
    `@environments/auth/auth-with-all-attributes/${process.env.PATH}`
  )
).default;

@Component({
  selector: 'sign-up-with-attributes',
  templateUrl: 'sign-up-with-attributes.component.html',
})
export class SignUpWithAttributesComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
