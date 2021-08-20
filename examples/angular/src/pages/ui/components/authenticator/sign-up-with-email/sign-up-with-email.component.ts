import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';

@Component({
  selector: 'sign-up-with-email',
  templateUrl: 'sign-up-with-email.component.html',
})
export class SignUpWithEmailComponent implements OnInit {
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
