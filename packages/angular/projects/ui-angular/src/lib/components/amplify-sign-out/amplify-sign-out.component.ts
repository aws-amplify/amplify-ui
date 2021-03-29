import { Component } from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
import { Auth } from 'aws-amplify';
@Component({
  selector: 'amplify-sign-out',
  templateUrl: './amplify-sign-out.component.html',
  styleUrls: [],
})
export class AmplifySignOutComponent {
  constructor(private stateMachine: StateMachineService) {}
  async signOut(): Promise<void> {
    try {
      await Auth.signOut();
      this.stateMachine.authState = 'signIn';
    } catch (err) {
      console.error(err);
    }
  }
}
