import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from '@environments/auth-with-email/src/aws-exports';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'use-authenticator',
  templateUrl: 'use-authenticator.component.html',
})
export class UseAuthenticatorComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
