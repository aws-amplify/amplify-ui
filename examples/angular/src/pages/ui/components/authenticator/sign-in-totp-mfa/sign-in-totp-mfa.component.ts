import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';

import awsExports from '@environments/auth-with-totp-mfa/src/aws-exports';

@Component({
  selector: 'sign-in-totp-mfa',
  templateUrl: 'sign-in-totp-mfa.component.html',
})
export class SignInTOTPMFAComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
