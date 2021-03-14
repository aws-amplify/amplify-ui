import { Component, ContentChild, TemplateRef } from '@angular/core';
import { AuthState } from '../../common/auth-types';
import { AmplifyOverrideDirective } from '../../directives/amplify-override.directive';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: [],
})
export class AmplifyAuthenticatorComponent {
  private authState: AuthState = 'signIn';
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
