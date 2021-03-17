import {
  Component,
  ContentChild,
  HostBinding,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AuthState } from '../../common/auth-types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: ['./amplify-authenticator.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AmplifyAuthenticatorComponent {
  private authState: AuthState = 'signIn';
  @HostBinding('attr.data-spark-authenticator') dataAttr = '';
  @ContentChild('signIn') customSignIn: TemplateRef<any> = null;
  @ContentChild('signedIn') customSignedIn: TemplateRef<any> = null;
  @ContentChild('signInButton') signInButton: TemplateRef<any> = null;
  get getAuthState(): AuthState {
    return this.authState;
  }
  public getCustomComponents(): Record<string, TemplateRef<any>> {
    return {
      signInButton: this.signInButton,
    };
  }
  updateAuthState(newAuthState: AuthState): void {
    this.authState = newAuthState;
  }
}
