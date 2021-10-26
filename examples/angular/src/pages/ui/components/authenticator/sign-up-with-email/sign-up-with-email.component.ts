import { Component } from '@angular/core';
import { Amplify } from '@aws-amplify/core';
import awsExports from '@environments/auth-with-email/src/aws-exports';

@Component({
  selector: 'sign-up-with-email',
  templateUrl: 'sign-up-with-email.component.html',
})
export class SignUpWithEmailComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
}
