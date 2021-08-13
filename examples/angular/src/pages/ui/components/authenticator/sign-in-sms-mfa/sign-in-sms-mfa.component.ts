import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-phone-and-sms-mfa/src/aws-exports';

@Component({
  selector: 'sign-in-sms-mfa',
  templateUrl: 'sign-in-sms-mfa.component.html',
})
export class SignInSMSMFAComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['phone_number'],
      },
    });
  }

  ngOnInit() {}
}
