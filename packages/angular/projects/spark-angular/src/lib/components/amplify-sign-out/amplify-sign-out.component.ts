import { Component } from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-out',
  templateUrl: './amplify-sign-out.component.html',
  styleUrls: [],
})
export class AmplifySignOutComponent {
  constructor(private authenticator: AmplifyAuthenticatorComponent) {}
  signOut(): void {
    this.authenticator.updateAuthState('signIn');
  }
}
