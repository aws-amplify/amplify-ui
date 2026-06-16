import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';

@Component({
  selector: 'amplify-federated-sign-in-button',
  standalone: false,
  templateUrl: './federated-sign-in-button.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FederatedSignInButtonComponent {
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
