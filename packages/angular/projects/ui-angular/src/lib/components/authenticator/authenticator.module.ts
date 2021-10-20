import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import {
  AmplifyAuthenticatorComponent,
  AmplifyConfirmSignInComponent,
  AmplifyConfirmSignUpComponent,
  AmplifyFederatedSignInButtonComponent,
  AmplifyFederatedSignInComponent,
  AmplifyForceNewPasswordComponent,
  AmplifyResetPasswordComponent,
  AmplifySetupTotpComponent,
  AmplifySignInComponent,
  AmplifySignUpComponent,
  AmplifyVerifyUserComponent,
  ConfirmResetPasswordComponent,
  ConfirmVerifyUserComponent,
} from './components';

import {
  AmplifyButtonComponent,
  AmplifyErrorComponent,
  AmplifyFormFieldComponent,
  AmplifyPasswordFieldComponent,
  AmplifySelectComponent,
  AmplifyTextFieldComponent,
  AmplifyUserNameAliasComponent,
  PhoneNumberFieldComponent,
  TabItemComponent,
  TabsComponent,
} from '../../primitives';

import { AmplifySlotDirective } from '../../directives/amplify-slot.directive';

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
    AmplifyFormFieldComponent,
    AmplifyErrorComponent,
    AmplifySlotDirective,
  ],
})
export class AmplifyAuthenticatorModule {}
