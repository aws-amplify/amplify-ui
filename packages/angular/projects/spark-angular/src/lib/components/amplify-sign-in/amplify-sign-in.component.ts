import {
  Component,
  HostBinding,
  Input,
  Optional,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AmplifyContextProviderComponent } from '../../amplify-context-provider/amplify-context-provider.component';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AmplifySignInComponent {
  @HostBinding('attr.data-spark-sign-in') dataAttr = '';

  public style = this.provider?.getStyle;
  public context = {
    $implicit: { signIn: () => this.signIn() },
  };
  public customComponents: Record<string, TemplateRef<any>> = {};
  @Input() public headerText = 'Sign in to your account';
  constructor(
    private authenticator: AmplifyAuthenticatorComponent,
    @Optional() private provider: AmplifyContextProviderComponent
  ) {
    this.customComponents = authenticator.getCustomComponents();
  }

  signIn(): void {
    this.authenticator.updateAuthState('signedIn');
  }
}
