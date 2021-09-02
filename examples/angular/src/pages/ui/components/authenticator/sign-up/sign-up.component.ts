import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
})
export class SignUpComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
