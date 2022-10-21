import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'reset-password',
  templateUrl: 'reset-password.component.html',
})
export class ResetPasswordComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
