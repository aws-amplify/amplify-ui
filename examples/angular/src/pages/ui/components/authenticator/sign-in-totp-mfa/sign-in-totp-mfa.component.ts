import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-totp-mfa',
  templateUrl: 'sign-in-totp-mfa.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInTOTPMFAComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
  public formFields = {
    setupTotp: { QR: { totpIssuer: 'My Web App' } },
  };
}
