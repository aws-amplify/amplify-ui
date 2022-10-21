import { Component, OnInit } from '@angular/core';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-angular';

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
