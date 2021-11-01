import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Note: Angular components and directives inside module files has to be imported directly.
 *
 * Related: https://github.com/ng-packagr/ng-packagr/issues/567
 */
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifyConfirmSignInComponent } from './components/amplify-confirm-sign-in/amplify-confirm-sign-in.component';
import { AmplifyConfirmSignUpComponent } from './components/amplify-confirm-sign-up/amplify-confirm-sign-up.component';
import { AmplifyFederatedSignInButtonComponent } from './components/amplify-federated-sign-in-button/amplify-federated-sign-in-button.component';
import { AmplifyFederatedSignInComponent } from './components/amplify-federated-sign-in/amplify-federated-sign-in.component';
import { AmplifyForceNewPasswordComponent } from './components/amplify-force-new-password/amplify-force-new-password.component';
import { AmplifyResetPasswordComponent } from './components/amplify-reset-password/amplify-reset-password.component';
import { AmplifySetupTotpComponent } from './components/amplify-setup-totp/amplify-setup-totp.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifySignUpFormFieldsComponent } from './components/amplify-sign-up/amplify-sign-up-form-fields.component';
import { AmplifyVerifyUserComponent } from './components/amplify-verify-user/amplify-verify-user.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/amplify-confirm-reset-password.component';
import { ConfirmVerifyUserComponent } from './components/confirm-verify-user/amplify-confirm-verify-user.component';

import { AmplifyFormFieldComponent } from '../../primitives/amplify-form-field/amplify-form-field.component';
import { AmplifyErrorComponent } from '../../primitives/amplify-error/amplify-error.component';
import { AmplifyButtonComponent } from '../../primitives/amplify-button/amplify-button.component';
import { AmplifyPasswordFieldComponent } from '../../primitives/amplify-password-field/amplify-password-field.component';
import { AmplifySelectComponent } from '../../primitives/amplify-select/amplify-select.component';
import { AmplifyTextFieldComponent } from '../../primitives/amplify-text-field/amplify-text-field.component';
import { AmplifyUserNameAliasComponent } from '../../primitives/amplify-user-name-alias/amplify-user-name-alias.component';
import { PhoneNumberFieldComponent } from '../../primitives/phone-number-field/phone-number-field.component';
import { TabItemComponent } from '../../primitives/tab-item/tab-item.component';
import { TabsComponent } from '../../primitives/tabs/tabs.component';

import { AmplifySlotComponent } from '../../utilities/amplify-slot/amplify-slot.component';
import { AmplifySlotDirective } from '../../utilities/amplify-slot/amplify-slot.directive';

@NgModule({
  declarations: [
    AmplifyAuthenticatorComponent,
    AmplifyButtonComponent,
    AmplifyConfirmSignInComponent,
    AmplifyConfirmSignUpComponent,
    AmplifyErrorComponent,
    AmplifyFederatedSignInButtonComponent,
    AmplifyFederatedSignInComponent,
    AmplifyForceNewPasswordComponent,
    AmplifyFormFieldComponent,
    AmplifyPasswordFieldComponent,
    AmplifyResetPasswordComponent,
    AmplifySelectComponent,
    AmplifySetupTotpComponent,
    AmplifySignInComponent,
    AmplifySignUpComponent,
    AmplifySignUpFormFieldsComponent,
    AmplifySlotComponent,
    AmplifySlotDirective,
    AmplifyTextFieldComponent,
    AmplifyUserNameAliasComponent,
    AmplifyVerifyUserComponent,
    ConfirmResetPasswordComponent,
    ConfirmVerifyUserComponent,
    PhoneNumberFieldComponent,
    TabItemComponent,
    TabsComponent,
  ],
  imports: [CommonModule, BrowserModule],
  exports: [
    AmplifyAuthenticatorComponent,
    AmplifySignUpFormFieldsComponent,
    AmplifySlotDirective,
  ],
})
export class AmplifyAuthenticatorModule {}
