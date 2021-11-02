import { Component, Input } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/state-machine.service';

@Component({
  selector: 'amplify-federated-sign-in-button',
  templateUrl: './amplify-federated-sign-in-button.component.html',
})
export class AmplifyFederatedSignInButtonComponent {
  @Input() provider: FederatedIdentityProviders;
  @Input() text: string;

  constructor(private authenticator: AuthenticatorService) {}

  onClick = (): void => {
    this.authenticator.send({
      type: 'FEDERATED_SIGN_IN',
      data: { provider: this.provider },
    });
  };
}
