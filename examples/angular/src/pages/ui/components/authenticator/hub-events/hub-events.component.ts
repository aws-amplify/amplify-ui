import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

const amplifyOutputs = (
  await import(`@environments/auth/auth-with-email/${process.env.PATH}`)
).default;

@Component({
  selector: 'hub-events',
  templateUrl: 'hub-events.component.html',
})
export class HubEventsComponent {
  constructor() {
    Amplify.configure(amplifyOutputs);
  }

  public signOut(): void {
    signOut();
  }
}
