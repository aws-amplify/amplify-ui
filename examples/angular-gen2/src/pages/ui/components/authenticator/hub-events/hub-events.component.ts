import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import amplifyOutputs from './amplify_outputs';

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
