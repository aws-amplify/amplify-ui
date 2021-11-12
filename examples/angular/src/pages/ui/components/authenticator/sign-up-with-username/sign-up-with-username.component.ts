import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username/src/aws-exports';

@Component({
  selector: 'sign-up-with-username',
  templateUrl: 'sign-up-with-username.component.html',
})
export class SignUpWithUsernameComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
