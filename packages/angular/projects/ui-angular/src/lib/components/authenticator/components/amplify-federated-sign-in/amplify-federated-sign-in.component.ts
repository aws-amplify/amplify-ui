import { Component, OnInit } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
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

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const { socialProviders } = this.authenticator.context?.config;

    this.includeFacebook = socialProviders?.includes('facebook');
    this.includeGoogle = socialProviders?.includes('google');
    this.includeAmazon = socialProviders?.includes('amazon');

    this.shouldShowFederatedSignIn =
      this.includeFacebook || this.includeGoogle || this.includeAmazon;
  }
}
