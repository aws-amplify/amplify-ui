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
  public includeAmazon: boolean = false;
  public includeApple: boolean = false;
  public includeFacebook: boolean = false;
  public includeGoogle: boolean = false;
  public shouldShowFederatedSignIn = false;

  // translated texts
  public signInAmazonText = translate('Sign In with Amazon');
  public signInAppleText = translate('Sign In with Apple');
  public signInFacebookText = translate('Sign In with Facebook');
  public signInGoogleText = translate('Sign In with Google');

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const { socialProviders } = this.authenticator.context?.config;

    this.includeAmazon = socialProviders?.includes('amazon');
    this.includeApple = socialProviders?.includes('apple');
    this.includeGoogle = socialProviders?.includes('google');
    this.includeFacebook = socialProviders?.includes('facebook');

    this.shouldShowFederatedSignIn =
      this.includeAmazon ||
      this.includeApple ||
      this.includeFacebook ||
      this.includeGoogle;
  }
}
