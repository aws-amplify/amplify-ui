import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';

@Component({
  selector: 'sign-in-totp-sms',
  templateUrl: 'sign-in-totp-sms.component.html',
})
export class SignInTOTPSMSComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['email'],
      },
    });
  }

  ngOnInit() {}
}
