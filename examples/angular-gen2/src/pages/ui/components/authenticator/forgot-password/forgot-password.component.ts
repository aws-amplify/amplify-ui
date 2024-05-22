import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import amplifyOutputs from './amplify_outputs';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
})
export class ForgotPasswordComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }
}
