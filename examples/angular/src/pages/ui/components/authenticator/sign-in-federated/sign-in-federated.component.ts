import { Component, OnInit } from '@angular/core';
import Amplify from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';

@Component({
  selector: 'sign-in-federated',
  templateUrl: 'sign-in-federated.component.html',
})
export class SignInFederatedComponent implements OnInit {
  constructor() {
    Amplify.configure({
      ...awsExports,
      auth: {
        login_mechanisms: ['email', 'facebook', 'google', 'amazon'],
      },
    });
  }

  ngOnInit() {}
}
