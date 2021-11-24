import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-totp-sms',
  templateUrl: 'sign-in-totp-sms.component.html',
})
export class SignInTOTPSMSComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
