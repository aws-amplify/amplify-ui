import { Component, OnInit } from '@angular/core';
import Amplify from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';

@Component({
  selector: 'auth-with-email',
  templateUrl: 'auth-with-email.component.html',
})
export class AuthWithEmailComponent implements OnInit {
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
