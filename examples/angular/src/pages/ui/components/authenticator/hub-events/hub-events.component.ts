import { Component } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
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
