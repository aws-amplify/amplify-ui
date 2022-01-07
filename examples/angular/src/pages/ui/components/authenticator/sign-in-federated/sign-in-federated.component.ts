import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-federated',
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
