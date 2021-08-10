import { Component } from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
@Component({
  selector: 'amplify-sign-out',
  templateUrl: './amplify-sign-out.component.html',
  styleUrls: [],
})
export class AmplifySignOutComponent {
  constructor(private stateMachine: StateMachineService) {}
  async signOut(): Promise<void> {
    try {
      this.stateMachine.authService.send('SIGN_OUT');
    } catch (err) {
      console.error(err);
    }
  }
}
