import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-sms-mfa',
  templateUrl: 'sign-in-sms-mfa.component.html',
})
export class SignInSMSMFAComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
