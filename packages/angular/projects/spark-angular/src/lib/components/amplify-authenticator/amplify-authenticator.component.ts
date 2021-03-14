import { Component, ContentChild, TemplateRef } from '@angular/core';
import { AuthState } from '../../common/auth-types';
import { GetCtxDirective } from '../../directives/get-ctx.directive';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: [],
})
export class AmplifyAuthenticatorComponent {
  private authState: AuthState = 'signIn';
  @ContentChild('signIn') customSignIn: TemplateRef<any>;
  @ContentChild('signedIn') customSignedIn: TemplateRef<any>;
  get getAuthState(): AuthState {
    return this.authState;
  }
  updateAuthState(newAuthState: AuthState): void {
    this.authState = newAuthState;
  }
}
