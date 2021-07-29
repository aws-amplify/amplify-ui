import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifyInputComponent } from './primitives/amplify-input/amplify-input.component';
import { AmplifyErrorComponent } from './primitives/amplify-error/amplify-error.component';
import { AmplifyConfirmSignUpComponent } from './components/amplify-confirm-sign-up/amplify-confirm-sign-up.component';
import { AmplifyUserNameAliasComponent } from './primitives/amplify-user-name-alias/amplify-user-name-alias.component';
import { AmplifyConfirmSignInComponent } from './components/amplify-confirm-sign-in/amplify-confirm-sign-in.component';
import { AmplifySetupTotpComponent } from './components/amplify-setup-totp/amplify-setup-totp.component';

@NgModule({
  declarations: [
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifySignUpComponent,
    AmplifyInputComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
    AmplifyConfirmSignUpComponent,
    AmplifyUserNameAliasComponent,
    AmplifyConfirmSignInComponent,
    AmplifySetupTotpComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyInputComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
  ],
})
export class UiAngularModule {}
