import { Component, OnInit } from '@angular/core';

import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';

@Component({
  selector: 'auth-with-phone',
  templateUrl: 'auth-with-phone.component.html',
})
export class AuthWithPhoneComponent implements OnInit {
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
