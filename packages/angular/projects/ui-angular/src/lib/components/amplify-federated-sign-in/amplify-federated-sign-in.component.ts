import {
  AfterContentInit,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { StateMachineService } from '../../services/state-machine.service';
import { FederatedIdentityProviders } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-federated-sign-in',
  templateUrl: './amplify-federated-sign-in.component.html',
})
export class AmplifyFederatedSignInComponent implements OnInit {
  public FederatedProviders = FederatedIdentityProviders;
  public includeFacebook: boolean = false;
  public includeGoogle: boolean = false;
  public includeAmazon: boolean = false;
  public shouldShowFederatedSignIn = false;

  constructor(private stateMachine: StateMachineService) {}

  ngOnInit(): void {
    const loginMechanisms = this.stateMachine.context?.config?.login_mechanisms;

    this.includeFacebook = loginMechanisms?.includes('facebook');
    this.includeGoogle = loginMechanisms?.includes('google');
    this.includeAmazon = loginMechanisms?.includes('amazon');

    this.shouldShowFederatedSignIn =
      this.includeFacebook || this.includeGoogle || this.includeAmazon;
  }
}
