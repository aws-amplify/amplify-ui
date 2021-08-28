import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

@Component({
  selector: 'auth-with-username',
  templateUrl: 'auth-with-username.component.html',
})
export class AuthWithUsernameComponent implements OnInit {
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
