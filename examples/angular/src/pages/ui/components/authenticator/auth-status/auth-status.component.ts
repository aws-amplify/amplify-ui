import { Component } from '@angular/core';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify, Auth } from 'aws-amplify';

import awsExports from './aws-exports';

@Component({
  selector: 'auth-status',
  templateUrl: 'auth-status.component.html',
})
export class AuthStatusComponent {
  constructor(public authenticator: AuthenticatorService) {
    Amplify.configure(awsExports);
  }

  get isAuthenticated(): boolean {
    return this.authenticator.authStatus === 'authenticated';
  }

  signOut() {
    Auth.signOut();
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    Auth.signIn(Object.fromEntries(formData) as any);
  }
}
