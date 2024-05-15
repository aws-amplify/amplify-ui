import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'sign-in-federated',
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
