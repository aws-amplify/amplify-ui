import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'custom-slots',
  templateUrl: 'custom-slots.component.html',
})
export class CustomSlotsComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }
  public formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your email',
      },
    },
    signUp: {
      password: {
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        placeholder: 'Enter your Password:',
      },
    },
    resetPassword: {
      username: {
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        placeholder: 'Enter your Password Please:',
      },
    },
    setupTOTP: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
}
