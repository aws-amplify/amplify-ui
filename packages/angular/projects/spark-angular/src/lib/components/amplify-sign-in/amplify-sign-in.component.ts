import {
  Component,
  HostBinding,
  Input,
  Optional,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent {
  @HostBinding('attr.data-spark-sign-in') dataAttr = '';

  public customComponents: Record<string, TemplateRef<any>> = {};
  @Input() public headerText = 'Sign in to your account';
  public context = {
    $implicit: { signIn: () => this.signIn() },
  };

  constructor(private authenticator: AmplifyAuthenticatorComponent) {
    this.customComponents = authenticator.getCustomComponentMap;
  }

  signIn(): void {
    this.authenticator.updateAuthState('signedIn');
  }
}
