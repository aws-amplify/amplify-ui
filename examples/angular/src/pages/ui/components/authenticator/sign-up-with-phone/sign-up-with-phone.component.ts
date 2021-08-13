import { Component, NgZone, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';
Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['phone_number'],
  },
});

@Component({
  selector: 'sign-up-with-phone',
  templateUrl: 'sign-up-with-phone.component.html',
})
export class SignUpWithPhoneComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
