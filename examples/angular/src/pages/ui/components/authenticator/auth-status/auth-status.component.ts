import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

import { signIn, signOut } from 'aws-amplify/auth';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'auth-status',
  templateUrl: 'auth-status.component.html',
})
export class AuthStatusComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(amplifyOutputs);
  }

  get isAuthenticated(): boolean {
    return this.authenticator.authStatus === 'authenticated';
  }

  signOut() {
    signOut();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    signIn({
      username: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  }
}
