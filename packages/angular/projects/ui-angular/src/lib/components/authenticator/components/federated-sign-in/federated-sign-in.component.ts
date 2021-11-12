import { Component, OnInit } from '@angular/core';
import { FederatedIdentityProviders } from '@aws-amplify/ui';
import { AuthenticatorService } from '../../../../services/authenticator.service';
import { translate } from '@aws-amplify/ui';

@Component({
  selector: 'amplify-federated-sign-in',
  templateUrl: './federated-sign-in.component.html',
})
export class AmplifyFederatedSignInComponent implements OnInit {
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
    const federatedText = route === 'signUp' ? 'Up' : 'In';
    this.signInAmazonText = translate<string>(
      `Sign ${federatedText} with Amazon`
    );
    this.signInAppleText = translate<string>(
      `Sign ${federatedText} with Apple`
    );
    this.signInFacebookText = translate<string>(
      `Sign ${federatedText} with Facebook`
    );
    this.signInGoogleText = translate<string>(
      `Sign ${federatedText} with Google`
    );
  }
}
