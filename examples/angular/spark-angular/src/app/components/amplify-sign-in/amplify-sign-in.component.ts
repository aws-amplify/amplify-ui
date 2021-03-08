import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  styleUrls: ['./amplify-sign-in.component.css'],
})
export class AmplifySignInComponent {
  constructor(private authenticator: AmplifyAuthenticatorComponent) {}
  @Input() headerText = 'Sign in to your account';

  signIn() {
    console.log('signing in...');
    // this.signInEvent.emit('signedIn');
    this.authenticator.updateAuthState('signedIn');
  }

  @Output() signInEvent = new EventEmitter<string>();
}
