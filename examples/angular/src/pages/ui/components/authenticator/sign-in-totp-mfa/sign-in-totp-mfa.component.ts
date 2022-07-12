import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-totp-mfa',
  templateUrl: 'sign-in-totp-mfa.component.html',
})
export class SignInTOTPMFAComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
