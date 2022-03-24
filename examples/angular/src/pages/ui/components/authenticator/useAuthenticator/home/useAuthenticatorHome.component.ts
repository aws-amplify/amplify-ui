import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from '../aws-exports';

@Component({
  selector: 'use-authenticator',
  templateUrl: 'useAuthenticatorHome.component.html',
})
export class UseAuthenticatorHomeComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
