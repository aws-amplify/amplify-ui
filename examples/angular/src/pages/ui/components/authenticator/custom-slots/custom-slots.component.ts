import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';

import awsExports from '@environments/auth-with-federated/src/aws-exports';

@Component({
  selector: 'custom-slots',
  templateUrl: 'custom-slots.component.html',
})
export class CustomSlotsComponent {
  constructor(private authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
