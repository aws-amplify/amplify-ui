import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signUp, SignUpInput } from 'aws-amplify/auth';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'override-function-calls',
  templateUrl: 'override-function-calls.component.html',
})
export class OverrideFunctionCallsComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
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
