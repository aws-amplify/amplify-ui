import { Component } from '@angular/core';
import Amplify from 'aws-amplify';
import awsExports from '@environments/auth-with-federated/src/aws-exports';
import { AuthenticatorService } from '@aws-amplify/ui-angular';

@Component({
  selector: 'custom-slots',
  templateUrl: 'custom-slots.component.html',
})
export class CustomSlotsComponent {
  constructor(private authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  get auth() {
    const { toResetPassword, toSignIn } = this.authenticator;
    return { toResetPassword, toSignIn };
  }
}
