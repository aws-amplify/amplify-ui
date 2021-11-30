import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-phone',
  templateUrl: 'sign-in-with-phone.component.html',
})
export class SignInWithPhoneComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
