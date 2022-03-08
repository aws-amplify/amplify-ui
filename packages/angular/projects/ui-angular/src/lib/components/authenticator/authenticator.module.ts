import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Note: Angular components and directives inside module files has to be imported directly.
 *
 * Related: https://github.com/ng-packagr/ng-packagr/issues/567
 */
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/amplify-confirm-reset-password.component';
import { ConfirmSignInComponent } from './components/confirm-sign-in/confirm-sign-in.component';
import { ConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { ConfirmVerifyUserComponent } from './components/confirm-verify-user/amplify-confirm-verify-user.component';
import { FederatedSignInButtonComponent } from './components/federated-sign-in-button/federated-sign-in-button.component';
import { FederatedSignInComponent } from './components/federated-sign-in/federated-sign-in.component';
import { ForceNewPasswordComponent } from './components/force-new-password/force-new-password.component';
import { ForceNewPasswordFormFieldsComponent } from './components/force-new-password/force-new-password-form-fields/force-new-password-form-fields.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SetupTotpComponent } from './components/setup-totp/setup-totp.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpFormFieldsComponent } from './components/sign-up/sign-up-form-fields/sign-up-form-fields.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { BaseFormFieldsComponent } from './components/base-form-fields/base-form-fields.component';

import { ButtonComponent } from '../../primitives/button/button.component';
import { CheckboxComponent } from '../../primitives/checkbox/checkbox.component';
import { ErrorComponent } from '../../primitives/error/error.component';
import { PasswordFieldComponent } from '../../primitives/password-field/password-field.component';
import { PhoneNumberFieldComponent } from '../../primitives/phone-number-field/phone-number-field.component';
import { SelectComponent } from '../../primitives/select/select.component';
import { TabItemComponent } from '../../primitives/tab-item/tab-item.component';
import { TabsComponent } from '../../primitives/tabs/tabs.component';
import { TextFieldComponent } from '../../primitives/text-field/text-field.component';

import { AmplifySlotComponent } from '../../utilities/amplify-slot/amplify-slot.component';
import { AmplifySlotDirective } from '../../utilities/amplify-slot/amplify-slot.directive';

@NgModule({
  declarations: [
    AmplifySlotComponent,
    AmplifySlotDirective,
    AuthenticatorComponent,
    BaseFormFieldsComponent,
    ButtonComponent,
    CheckboxComponent,
    ConfirmResetPasswordComponent,
    ConfirmSignInComponent,
    ConfirmSignUpComponent,
    ConfirmVerifyUserComponent,
    ErrorComponent,
    FederatedSignInButtonComponent,
    FederatedSignInComponent,
    ForceNewPasswordComponent,
    ForceNewPasswordFormFieldsComponent,
    FormFieldComponent,
    PasswordFieldComponent,
    PhoneNumberFieldComponent,
    ResetPasswordComponent,
    SelectComponent,
    SetupTotpComponent,
    SignInComponent,
    SignUpComponent,
    SignUpFormFieldsComponent,
    TabItemComponent,
    TabsComponent,
    TextFieldComponent,
    VerifyUserComponent,
  ],
  imports: [CommonModule],
  exports: [
    AmplifySlotDirective,
    AuthenticatorComponent,
    CheckboxComponent,
    SignUpFormFieldsComponent,
    ForceNewPasswordFormFieldsComponent,
    TextFieldComponent,
  ],
})
export class AmplifyAuthenticatorModule {}
