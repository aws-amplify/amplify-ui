import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'sign-in-with-email',
  templateUrl: 'sign-in-with-email.component.html',
})
export class SignInWithEmailComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
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
