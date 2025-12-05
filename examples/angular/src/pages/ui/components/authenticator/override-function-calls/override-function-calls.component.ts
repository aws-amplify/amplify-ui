import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signUp, SignUpInput } from 'aws-amplify/auth';
import awsExports from './aws-exports';

@Component({
  selector: 'override-function-calls',
  standalone: false,
  templateUrl: 'override-function-calls.component.html',
})
export class OverrideFunctionCallsComponent {
  constructor() {
    Amplify.configure(awsExports);
  }
  services = {
    async handleSignUp(input: SignUpInput) {
      let { username, password, options } = input;
      // custom username and email
      username = username.toLowerCase();
      const customEmail = options?.userAttributes?.email?.toLowerCase();
      return signUp({
        username,
        password,
        options: {
          ...options,
          userAttributes: {
            ...options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
}
