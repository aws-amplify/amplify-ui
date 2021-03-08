import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  styleUrls: ['./amplify-sign-in.component.css'],
})
export class AmplifySignInComponent {
  constructor() {}
  @Input() headerText = 'Sign in to your account';

  signIn() {
    console.log('signing in...');
    this.signInEvent.emit('signedIn');
  }

  @Output() signInEvent = new EventEmitter<string>();
}
