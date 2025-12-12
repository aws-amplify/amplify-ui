import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { AuthenticatorComponent } from '@aws-amplify/ui-angular';

import awsExports from './aws-exports';

@Component({
  selector: 'app-sign-in-with-email-mfa',
  standalone: false,
  templateUrl: './sign-in-with-email-mfa.component.html',
})
export class SignInWithEmailMfaComponent {
  public services: AuthenticatorComponent['services'] = {
    handleSignIn: async () => {
      return {
        isSignedIn: false,
        nextStep: {
          signInStep: 'CONFIRM_SIGN_IN_WITH_EMAIL_CODE',
          codeDeliveryDetails: {
            destination: 'a***@e***.com',
            deliveryMedium: 'EMAIL',
            attributeName: 'email',
          },
        },
      };
    },
    handleConfirmSignIn: async ({ challengeResponse }) => {
      if (challengeResponse === '123456') {
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
}
