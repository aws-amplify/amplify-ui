import { Component, Input, OnInit } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui-core';
import { StateMachineService } from '../../services/state-machine.service';

@Component({
  selector: 'amplify-federated-sign-in-button',
  templateUrl: './amplify-federated-sign-in-button.component.html',
})
export class AmplifyFederatedSignInButtonComponent {
  @Input() provider: FederatedIdentityProviders;
  @Input() text: string;

  constructor(private stateMachine: StateMachineService) {}

  onClick = (): void => {
    this.stateMachine.send({
      type: 'FEDERATED_SIGN_IN',
      data: { provider: this.provider },
    });
  };
}
