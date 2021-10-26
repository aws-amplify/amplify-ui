import { Component } from '@angular/core';

import { Amplify } from '@aws-amplify/core';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';

@Component({
  selector: 'sign-in-with-phone',
  templateUrl: 'sign-in-with-phone.component.html',
})
export class SignInWithPhoneComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
