import { Component } from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-out',
  templateUrl: './amplify-sign-out.component.html',
  styleUrls: [],
})
export class AmplifySignOutComponent {
  constructor(private stateMachine: StateMachineService) {}
  signOut(): void {
    this.stateMachine.authState = 'signIn';
  }
}
