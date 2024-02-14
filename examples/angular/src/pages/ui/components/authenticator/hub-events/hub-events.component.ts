import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import awsExports from './aws-exports';

@Component({
  selector: 'hub-events',
  templateUrl: 'hub-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HubEventsComponent {
  constructor() {
    Amplify.configure(awsExports);
  }

  public signOut(): void {
    signOut();
  }
}
