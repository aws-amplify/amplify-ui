import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'custom-slots',
  templateUrl: 'custom-slots.component.html',
})
export class CustomSlotsComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
}
