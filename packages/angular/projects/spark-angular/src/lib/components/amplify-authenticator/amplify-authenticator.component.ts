import { Component, ContentChild, TemplateRef } from '@angular/core';
import { AuthState } from '../../common/auth-types';

@Component({
  selector: 'amplify-authenticator',
  templateUrl: './amplify-authenticator.component.html',
  styleUrls: [],
})
export class AmplifyAuthenticatorComponent {
  private authState: AuthState = 'signIn';
  @ContentChild('signIn') signInContent: TemplateRef<any>;
  @ContentChild('signedIn') signedInContent: TemplateRef<any>;

  get getAuthState(): AuthState {
    return this.authState;
  }
  updateAuthState(newAuthState: AuthState): void {
    this.authState = newAuthState;
  }
}
