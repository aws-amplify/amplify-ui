import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

/**
 * Note: Angular components and directives inside module files has to be imported directly.
 *
 * Related: https://github.com/ng-packagr/ng-packagr/issues/567
 */
import { AmplifyAuthenticatorComponent } from './components/authenticator/authenticator.component';
import { AmplifyConfirmSignInComponent } from './components/confirm-sign-in/confirm-sign-in.component';
import { AmplifyConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { AmplifyFederatedSignInButtonComponent } from './components/federated-sign-in-button/federated-sign-in-button.component';
import { AmplifyFederatedSignInComponent } from './components/federated-sign-in/federated-sign-in.component';
import { AmplifyForceNewPasswordComponent } from './components/force-new-password/force-new-password.component';
import { AmplifyResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AmplifySetupTotpComponent } from './components/setup-totp/setup-totp.component';
import { AmplifySignInComponent } from './components/sign-in/sign-in.component';
import { AmplifySignUpComponent } from './components/sign-up/sign-up.component';
import { AmplifySignUpFormFieldsComponent } from './components/sign-up/sign-up-form-fields/sign-up-form-fields.component';
import { AmplifyVerifyUserComponent } from './components/verify-user/verify-user.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/amplify-confirm-reset-password.component';
import { ConfirmVerifyUserComponent } from './components/confirm-verify-user/amplify-confirm-verify-user.component';
import { AmplifyUserNameAliasComponent } from './components/user-name-alias/user-name-alias.component';
import { AmplifyFormFieldComponent } from './components/form-field/form-field.component';

import { AmplifyErrorComponent } from '../../primitives/error/error.component';
import { AmplifyButtonComponent } from '../../primitives/button/button.component';
import { AmplifyPasswordFieldComponent } from '../../primitives/password-field/password-field.component';
import { AmplifySelectComponent } from '../../primitives/select/select.component';
import { AmplifyTextFieldComponent } from '../../primitives/text-field/text-field.component';
import { PhoneNumberFieldComponent } from '../../primitives/phone-number-field/phone-number-field.component';
import { TabItemComponent } from '../../primitives/tab-item/tab-item.component';
import { TabsComponent } from '../../primitives/tabs/tabs.component';
import { AmplifyCheckboxComponent } from '../../primitives/checkbox/checkbox.component';

import { AmplifySlotComponent } from '../../utilities/amplify-slot/amplify-slot.component';
import { AmplifySlotDirective } from '../../utilities/amplify-slot/amplify-slot.directive';

@NgModule({
  declarations: [
    AmplifyAuthenticatorComponent,
    AmplifyButtonComponent,
    AmplifyCheckboxComponent,
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
    AmplifyCheckboxComponent,
    AmplifySignUpFormFieldsComponent,
    AmplifySlotDirective,
    AmplifyTextFieldComponent,
  ],
})
export class AmplifyAuthenticatorModule {}
