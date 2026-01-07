import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-up-with-username',
  standalone: false,
  templateUrl: 'sign-up-with-username.component.html',
})
export class SignUpWithUsernameComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
