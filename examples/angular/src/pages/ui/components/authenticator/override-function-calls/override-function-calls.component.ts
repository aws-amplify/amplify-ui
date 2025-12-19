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
  services = {
    async handleSignUp(input: SignUpInput): ReturnType<typeof signUp> {
      let { username } = input;
      const { password, options } = input;
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
  constructor() {
    Amplify.configure(awsExports);
  }
}
