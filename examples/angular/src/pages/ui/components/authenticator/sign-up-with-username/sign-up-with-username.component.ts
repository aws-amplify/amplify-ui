import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-up-with-username',
  templateUrl: 'sign-up-with-username.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpWithUsernameComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
