import { Component } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
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
      const { username, password, attributes } = formData;
      // custom username
      const newAttributes = {
        ...attributes,
        email: attributes.email.toLowerCase(),
      };
      return Auth.signUp({
        username: username.toLowerCase(),
        password,
        attributes: newAttributes,
      });
    },
  };
}
