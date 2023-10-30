import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

@Component({
  selector: 'sign-in-federated',
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent {
  constructor() {}
}
