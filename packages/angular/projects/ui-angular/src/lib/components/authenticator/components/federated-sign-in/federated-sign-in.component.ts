import { Component, OnInit } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { authenticatorTextUtil } from '@aws-amplify/ui';

const { getSignInWithFederationText } = authenticatorTextUtil;

@Component({
  selector: 'amplify-federated-sign-in',
  templateUrl: './federated-sign-in.component.html',
})
export class FederatedSignInComponent implements OnInit {
  public FederatedProviders = FederatedIdentityProviders;
  public includeAmazon: boolean = false;
  public includeApple: boolean = false;
  public includeFacebook: boolean = false;
  public includeGoogle: boolean = false;
  public shouldShowFederatedSignIn = false;

  // translated texts
  public signInAmazonText: string;
  public signInAppleText: string;
  public signInFacebookText: string;
  public signInGoogleText: string;

  constructor(private authenticator: AuthenticatorService) {}

  ngOnInit(): void {
    const { socialProviders } = this.authenticator.context?.config;

    this.setFederatedTexts();
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

  private setFederatedTexts() {
    const { route } = this.authenticator;

    this.signInAmazonText = getSignInWithFederationText(route, 'amazon');
    this.signInAppleText = getSignInWithFederationText(route, 'apple');
    this.signInFacebookText = getSignInWithFederationText(route, 'facebook');
    this.signInGoogleText = getSignInWithFederationText(route, 'google');
  }
}
