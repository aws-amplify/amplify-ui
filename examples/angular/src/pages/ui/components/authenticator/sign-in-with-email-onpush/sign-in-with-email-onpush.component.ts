import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-in-with-email-onpush',
  templateUrl: 'sign-in-with-email-onpush.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInWithEmailOnPushComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  public formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your cool email',
      },
    },
    confirmVerifyUser: {
      confirmation_code: {
        label: 'New Label',
        placeholder: 'Enter your Confirmation Code:',
        isRequired: false,
      },
    },
  };
}
