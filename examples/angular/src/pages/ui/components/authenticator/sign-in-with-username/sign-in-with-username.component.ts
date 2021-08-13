import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

@Component({
  selector: 'sign-in-with-username',
  templateUrl: 'sign-in-with-username.component.html',
})
export class SignInWithUsernameComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['username'],
      },
    });
  }

  ngOnInit() {}
}
