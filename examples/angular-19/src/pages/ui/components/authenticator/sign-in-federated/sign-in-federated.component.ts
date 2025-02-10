import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-federated',
  imports: [AmplifyAuthenticatorModule],
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
