import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiAngularModule } from '@aws-amplify/ui-angular';
import { AuthWithEmailComponent } from 'src/pages/ui/components/authenticator/auth-with-email/auth-with-email.component';
import { AuthWithMultiAliasComponent } from 'src/pages/ui/components/authenticator/auth-with-multi-alias/auth-with-multi-alias.component';
import { AuthWithPhoneComponent } from 'src/pages/ui/components/authenticator/auth-with-phone/auth-with-phone.component';
import { AuthWithUsernameComponent } from 'src/pages/ui/components/authenticator/auth-with-username/auth-with-username.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignUpComponent } from 'src/pages/ui/components/authenticator/sign-up/sign-up.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthWithEmailComponent,
    AuthWithMultiAliasComponent,
    AuthWithPhoneComponent,
    AuthWithUsernameComponent,
    SignInFederatedComponent,
    SignInSMSMFAComponent,
    SignInTOTPMFAComponent,
    SignInTOTPSMSComponent,
    SignUpComponent,
    SignUpWithEmailComponent,
    SignUpWithEmailComponent,
    SignUpWithPhoneComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, UiAngularModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
