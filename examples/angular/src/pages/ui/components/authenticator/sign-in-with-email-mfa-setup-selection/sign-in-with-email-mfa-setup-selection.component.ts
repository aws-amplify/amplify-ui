import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorComponent } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'app-sign-in-with-email-mfa-setup-selection',
  standalone: false,
  templateUrl: './sign-in-with-email-mfa-setup-selection.component.html',
})
export class SignInWithEmailMfaSetupSelectionComponent implements OnInit {
  public services: AuthenticatorComponent['services'] = {
    handleSignIn: async () => {
      return Promise.resolve({
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SETUP_SELECTION',
          allowedMFATypes: ['EMAIL', 'TOTP'],
        },
      });
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
      if (challengeResponse === 'EMAIL') {
        return Promise.resolve({
          isSignedIn: false,
          nextStep: {
            signInStep: 'CONTINUE_SIGN_IN_WITH_EMAIL_SETUP',
          },
        });
      }
      if (challengeResponse.includes('@example.com')) {
        return Promise.resolve({
          isSignedIn: false,
          nextStep: {
            signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
            codeDeliveryDetails: {
              destination: 'a***@e***.com',
              deliveryMedium: 'EMAIL',
              attributeName: 'email',
            },
          },
        });
      }
      if (challengeResponse === '123456') {
        return Promise.resolve({
          isSignedIn: true,
          nextStep: {
            signInStep: 'DONE',
          },
        });
      }
      throw new Error('Invalid code or auth state for the user.');
    },
    getCurrentUser: async () => {
      return Promise.resolve({
        userId: '******************',
        username: 'james',
      });
    },
  };

  constructor() {
    Amplify.configure(awsExports);
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    /* noop */
  }
}
