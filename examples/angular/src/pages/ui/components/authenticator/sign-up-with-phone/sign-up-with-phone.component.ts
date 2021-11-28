import { Component } from '@angular/core';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-up-with-phone',
  templateUrl: 'sign-up-with-phone.component.html',
})
export class SignUpWithPhoneComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
