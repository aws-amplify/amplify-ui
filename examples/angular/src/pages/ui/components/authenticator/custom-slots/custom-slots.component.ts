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
  public formFields = {
    signIn: {
      username: {
        labelHidden: false,
        placeholder: 'Enter your email',
      },
    },
    signUp: {
      password: {
        labelHidden: false,
        label: 'Password:',
        placeholder: 'Enter your Password:',
        isRequired: false,
        order: 2,
      },
      confirm_password: {
        labelHidden: false,
        label: 'Confirm Password:',
        order: 1,
      },
    },
    forceNewPassword: {
      password: {
        labelHidden: false,
        placeholder: 'Enter your Password:',
      },
    },
    resetPassword: {
      username: {
        labelHidden: false,
        placeholder: 'Enter your email:',
      },
    },
    confirmResetPassword: {
      confirmation_code: {
        labelHidden: false,
        placeholder: 'Enter your Confirmation Code:',
        label: 'New Label',
        isRequired: false,
      },
      confirm_password: {
        labelHidden: false,
        placeholder: 'Enter your Password Please:',
      },
    },
    setupTOTP: {
      QR: {
        totpIssuer: 'test issuer',
        totpUsername: 'amplify_qr_test_user',
      },
      confirmation_code: {
        labelHidden: false,
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
    confirmSignIn: {
      confirmation_code: {
        labelHidden: false,
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
}
