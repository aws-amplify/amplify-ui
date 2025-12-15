import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-username',
  standalone: false,
  templateUrl: 'sign-in-with-username.component.html',
})
export class SignInWithUsernameComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
