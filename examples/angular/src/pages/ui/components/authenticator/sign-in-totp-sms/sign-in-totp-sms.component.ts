import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';

import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';

@Component({
  selector: 'sign-in-totp-sms',
  templateUrl: 'sign-in-totp-sms.component.html',
})
export class SignInTOTPSMSComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
