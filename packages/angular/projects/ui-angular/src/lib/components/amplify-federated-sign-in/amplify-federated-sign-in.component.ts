import { Component, OnInit } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { StateMachineService } from '../../services/state-machine.service';
import { translate } from '@aws-amplify/ui';

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

  // translated texts
  public signInFacebookText = translate('Sign In with Facebook');
  public signInGoogleText = translate('Sign In with Google');
  public signInAmazonText = translate('Sign In with Amazon');

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
