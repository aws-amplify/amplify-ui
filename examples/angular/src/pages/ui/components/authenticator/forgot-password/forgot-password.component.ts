import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'forgot-password',
  standalone: false,
  templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
