import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthStatusComponent } from 'src/pages/ui/components/authenticator/auth-status/auth-status.component';
import { CustomSignUpFieldsComponent } from 'src/pages/ui/components/authenticator/custom-sign-up-fields/custom-sign-up-fields.component';
import { CustomSlotsComponent } from 'src/pages/ui/components/authenticator/custom-slots/custom-slots.component';
import { HubEventsComponent } from 'src/pages/ui/components/authenticator/hub-events/hub-events.component';
import { I18nComponent } from 'src/pages/ui/components/authenticator/i18n/i18n.component';
import { ModalComponent } from 'src/pages/ui/components/authenticator/modal/modal.component';
import { OverrideFunctionCallsComponent } from 'src/pages/ui/components/authenticator/override-function-calls/override-function-calls.component';
import { ForgotPasswordComponent } from 'src/pages/ui/components/authenticator/forgot-password/forgot-password.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';
import { SignInWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-in-with-phone/sign-in-with-phone.component';
import { SignInWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-in-with-username/sign-in-with-username.component';
import { SignUpWithAttributesComponent } from 'src/pages/ui/components/authenticator/sign-up-with-attributes/sign-up-with-attributes.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithEmailLambdaComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email-lambda/sign-up-with-email-lambda.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignUpWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-up-with-username/sign-up-with-username.component';
import { UseAuthenticatorComponent } from 'src/pages/ui/components/authenticator/useAuthenticator/useAuthenticator.component';
import { UseAuthenticatorHomeComponent } from 'src/pages/ui/components/authenticator/useAuthenticator/home/useAuthenticatorHome.component';

import { AuthStatusComponent as Gen2AuthStatusComponent } from 'src/pages/ui/components/authenticator/gen2/auth-status/auth-status.component';
import { CustomSignUpFieldsComponent as Gen2CustomSignUpFieldsComponent } from 'src/pages/ui/components/authenticator/gen2/custom-sign-up-fields/custom-sign-up-fields.component';
import { CustomSlotsComponent as Gen2CustomSlotsComponent } from 'src/pages/ui/components/authenticator/gen2/custom-slots/custom-slots.component';
import { HubEventsComponent as Gen2HubEventsComponent } from 'src/pages/ui/components/authenticator/gen2/hub-events/hub-events.component';
import { I18nComponent as Gen2I18nComponent } from 'src/pages/ui/components/authenticator/gen2/i18n/i18n.component';
import { ModalComponent as Gen2ModalComponent } from 'src/pages/ui/components/authenticator/gen2/modal/modal.component';
import { OverrideFunctionCallsComponent as Gen2OverrideFunctionCallsComponent } from 'src/pages/ui/components/authenticator/gen2/override-function-calls/override-function-calls.component';
import { ForgotPasswordComponent as Gen2ForgotPasswordComponent } from 'src/pages/ui/components/authenticator/gen2/forgot-password/forgot-password.component';
import { SignInFederatedComponent as Gen2SignInFederatedComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent as Gen2SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent as Gen2SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInTOTPSMSComponent as Gen2SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-totp-sms/sign-in-totp-sms.component';
import { SignInWithEmailComponent as Gen2SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-with-email/sign-in-with-email.component';
import { SignInWithPhoneComponent as Gen2SignInWithPhoneComponent } from 'src/pages/ui/components/authenticator/gen2/sign-in-with-phone/sign-in-with-phone.component';
import { SignUpWithAttributesComponent as Gen2SignUpWithAttributesComponent } from 'src/pages/ui/components/authenticator/gen2/sign-up-with-attributes/sign-up-with-attributes.component';
import { SignUpWithEmailComponent as Gen2SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/gen2/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithEmailLambdaComponent as Gen2SignUpWithEmailLambdaComponent } from 'src/pages/ui/components/authenticator/gen2/sign-up-with-email-lambda/sign-up-with-email-lambda.component';
import { SignUpWithPhoneComponent as Gen2SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/gen2/sign-up-with-phone/sign-up-with-phone.component';
import { UseAuthenticatorComponent as Gen2UseAuthenticatorComponent } from 'src/pages/ui/components/authenticator/gen2/useAuthenticator/useAuthenticator.component';
import { UseAuthenticatorHomeComponent as Gen2UseAuthenticatorHomeComponent } from 'src/pages/ui/components/authenticator/gen2/useAuthenticator/home/useAuthenticatorHome.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthStatusComponent,
    CustomSignUpFieldsComponent,
    CustomSlotsComponent,
    HubEventsComponent,
    I18nComponent,
    ModalComponent,
    OverrideFunctionCallsComponent,
    ForgotPasswordComponent,
    SignInFederatedComponent,
    SignInSMSMFAComponent,
    SignInTOTPMFAComponent,
    SignInTOTPSMSComponent,
    SignInWithEmailComponent,
    SignInWithPhoneComponent,
    SignInWithUsernameComponent,
    SignUpWithAttributesComponent,
    SignUpWithEmailComponent,
    SignUpWithEmailLambdaComponent,
    SignUpWithPhoneComponent,
    SignUpWithUsernameComponent,
    UseAuthenticatorComponent,
    UseAuthenticatorHomeComponent,
    Gen2AuthStatusComponent,
    Gen2CustomSignUpFieldsComponent,
    Gen2CustomSlotsComponent,
    Gen2HubEventsComponent,
    Gen2I18nComponent,
    Gen2ModalComponent,
    Gen2OverrideFunctionCallsComponent,
    Gen2ForgotPasswordComponent,
    Gen2SignInFederatedComponent,
    Gen2SignInSMSMFAComponent,
    Gen2SignInTOTPMFAComponent,
    Gen2SignInTOTPSMSComponent,
    Gen2SignInWithEmailComponent,
    Gen2SignInWithPhoneComponent,
    Gen2SignUpWithAttributesComponent,
    Gen2SignUpWithEmailComponent,
    Gen2SignUpWithEmailLambdaComponent,
    Gen2SignUpWithPhoneComponent,
    Gen2UseAuthenticatorComponent,
    Gen2UseAuthenticatorHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
