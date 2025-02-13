import { Component, OnInit } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { AuthContext } from '@aws-amplify/ui';

@Component({
  selector: 'app-sign-in-with-email-mfa-selection',
  templateUrl: './sign-in-with-email-mfa-selection.component.html',
})
export class SignInWithEmailMfaSelectionComponent implements OnInit {
  public services: AuthContext['services'] = {
    handleSignIn: async () => {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONTINUE_SIGN_IN_WITH_MFA_SELECTION',
          allowedMFATypes: ['EMAIL', 'TOTP'],
        },
      };
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
      if (challengeResponse === 'EMAIL') {
        return {
          isSignedIn: false,
          nextStep: {
            signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
          },
        };
      }

      if (/^\d{6}$/.test(challengeResponse)) {
        return {
          isSignedIn: true,
          nextStep: {
            signInStep: 'DONE',
          },
        };
      }
      throw new Error('Invalid code or auth state for the user.');
    },
    getCurrentUser: async () => {
      return {
        userId: '******************',
        username: 'james',
      };
    },
  };

  constructor() {
    Amplify.configure(awsExports);
  }

  ngOnInit(): void {}
}
