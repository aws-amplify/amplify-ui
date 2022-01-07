import { Component } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';
import awsExports from './aws-exports';

@Component({
  selector: 'sign-up-with-email',
  templateUrl: 'sign-up-with-email.component.html',
})
export class SignUpWithEmailComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  services = {
    async handleSignUp(formData: Record<string, any>) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };
}
