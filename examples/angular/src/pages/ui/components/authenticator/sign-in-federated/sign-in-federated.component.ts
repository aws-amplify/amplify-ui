import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-federated/${process.env.PATH}`)
).default;

@Component({
  selector: 'sign-in-federated',
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
