import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-totp-mfa',
  templateUrl: 'sign-in-totp-mfa.component.html',
})
export class SignInTOTPMFAComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
