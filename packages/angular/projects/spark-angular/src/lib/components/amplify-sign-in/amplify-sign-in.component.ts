import { Component, Input, Optional, TemplateRef } from '@angular/core';
import { SparkContextProviderComponent } from '../../spark-context-provider/spark-context-provider.component';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
})
export class AmplifySignInComponent {
  public style = this.provider?.getStyle;
  public context = {
    $implicit: { signIn: () => this.signIn() },
  };
  public customComponents: Record<string, TemplateRef<any>> = {};
  @Input() public headerText = 'Sign in to your account';

  constructor(
    private authenticator: AmplifyAuthenticatorComponent,
    @Optional() private provider: SparkContextProviderComponent
  ) {
    this.customComponents = authenticator.getCustomComponents();
  }

  signIn(): void {
    this.authenticator.updateAuthState('signedIn');
  }
}
