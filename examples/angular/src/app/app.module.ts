import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// TODO: Rename UiAngularModule to AmplifyUiAngularModule
import { UiAngularModule } from '@aws-amplify/ui-angular';
import { AuthWithMultiAliasComponent } from 'src/pages/ui/components/authenticator/auth-with-multi-alias/auth-with-multi-alias.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-in-with-phone/sign-in-with-phone.component';
import { SignInWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-in-with-username/sign-in-with-username.component';
import { SignUpWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-up-with-username/sign-up-with-username.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthWithMultiAliasComponent,
    SignInWithEmailComponent,
    SignInFederatedComponent,
    SignInSMSMFAComponent,
    SignInTOTPMFAComponent,
    SignInTOTPSMSComponent,
    SignInWithPhoneComponent,
    SignInWithUsernameComponent,
    SignUpWithUsernameComponent,
    SignUpWithEmailComponent,
    SignUpWithEmailComponent,
    SignUpWithPhoneComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, UiAngularModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
