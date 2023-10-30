import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';

import { signIn, signOut } from 'aws-amplify/auth';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

@Component({
  selector: 'auth-status',
  templateUrl: 'auth-status.component.html',
})
export class AuthStatusComponent {
  constructor(public authenticator: AuthenticatorService) {}

  get isAuthenticated(): boolean {
    return this.authenticator.authStatus === 'authenticated';
  }

  signOut() {
    signOut();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    signIn(Object.fromEntries(formData) as any);
  }
}
