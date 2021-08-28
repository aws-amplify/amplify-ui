import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthWithEmailComponent } from 'src/pages/ui/components/authenticator/auth-with-email/auth-with-email.component';
import { AuthWithMultiAliasComponent } from 'src/pages/ui/components/authenticator/auth-with-multi-alias/auth-with-multi-alias.component';
import { AuthWithPhoneComponent } from 'src/pages/ui/components/authenticator/auth-with-phone/auth-with-phone.component';
import { AuthWithUsernameComponent } from 'src/pages/ui/components/authenticator/auth-with-username/auth-with-username.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignUpComponent } from 'src/pages/ui/components/authenticator/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'ui/components/authenticator/auth-with-email',
    component: AuthWithEmailComponent,
  },
  {
    path: 'ui/components/authenticator/auth-with-multi-alias',
    component: AuthWithMultiAliasComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-federated',
    component: SignInFederatedComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-sms-mfa',
    component: SignInSMSMFAComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-totp-mfa',
    component: SignInTOTPMFAComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-totp-sms',
    component: SignInTOTPSMSComponent,
  },
  {
    path: 'ui/components/authenticator/auth-with-phone',
    component: AuthWithPhoneComponent,
  },
  {
    path: 'ui/components/authenticator/auth-with-username',
    component: AuthWithUsernameComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up',
    component: SignUpComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-email',
    component: SignUpWithEmailComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-phone',
    component: SignUpWithPhoneComponent,
  },
  {
    path: 'ui/components/authenticator/sign-up-with-email',
    component: SignUpWithEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
