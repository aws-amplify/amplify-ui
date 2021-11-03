import { Component } from '@angular/core';
import Amplify from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';

@Component({
  selector: 'custom-sign-up-fields',
  templateUrl: 'custom-sign-up-fields.component.html',
})
export class CustomSignUpFieldsComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
