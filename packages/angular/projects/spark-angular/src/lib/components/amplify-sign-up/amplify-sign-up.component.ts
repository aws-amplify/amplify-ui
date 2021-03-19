import { Component, HostBinding, Input, TemplateRef } from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-up',
  templateUrl: './amplify-sign-up.component.html',
})
export class AmplifySignUpComponent {
  @Input() headerText = 'Create a new account';
  @HostBinding('attr.data-spark-sign-up') dataAttr = '';
  public customComponents: Record<string, TemplateRef<any>>;
  public context = {
    $implicit: {
      signUp: () => {
        console.log('to be implemented');
      },
    },
  };
  constructor(public authenticator: AmplifyAuthenticatorComponent) {
    this.customComponents = authenticator.getCustomComponents;
  }

  signUp() {
    this.authenticator.updateAuthState('signIn');
  }

  toSignIn() {
    this.authenticator.updateAuthState('signIn')
  }
}
