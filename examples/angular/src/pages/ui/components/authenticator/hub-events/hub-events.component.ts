import { Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import * as Auth from '@aws-amplify/auth';
import awsExports from './aws-exports';

@Component({
  selector: 'hub-events',
  templateUrl: 'hub-events.component.html',
})
export class HubEventsComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  public signOut(): void {
    Auth.signOut();
  }
}
