import {
  Component,
  Input,
  Optional,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { SparkContextProviderComponent } from '../../spark-context-provider/spark-context-provider.component';
import { AmplifyAuthenticatorComponent } from '../amplify-authenticator/amplify-authenticator.component';

@Component({
  selector: 'amplify-sign-in',
  templateUrl: './amplify-sign-in.component.html',
})
export class AmplifySignInComponent {
  style = this.provider?.getStyle;
  constructor(
    private authenticator: AmplifyAuthenticatorComponent,
    @Optional() private provider: SparkContextProviderComponent
  ) {}

  @ContentChild('signInButton') customSubmitButton: TemplateRef<any>;
  @Input() headerText = 'Sign in to your account';

  // this context will be passed to any templates under this component
  context = {
    signIn: () => this.signIn(),
  };

  signIn(): void {
    this.authenticator.updateAuthState('signedIn');
  }
}
