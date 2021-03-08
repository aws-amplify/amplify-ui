import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-out',
  templateUrl: './amplify-sign-out.component.html',
  styleUrls: ['./amplify-sign-out.component.css'],
})
export class AmplifySignOutComponent {
  // use dependency injection to find the nearest parent
  constructor(private authenticator: AmplifyAuthenticatorComponent) {}
  signOut() {
    console.log(this.authenticator);
    console.log('signing out...');
    this.signOutEvent.emit('signOut');
    this.authenticator.updateAuthState('signIn');
  }

  @Output() signOutEvent = new EventEmitter<string>();
}
