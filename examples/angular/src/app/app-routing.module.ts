import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';
import { SignInSMSMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-sms-mfa/sign-in-sms-mfa.component';
import { SignInTOTPMFAComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-mfa/sign-in-totp-mfa.component';
import { SignInTOTPSMSComponent } from 'src/pages/ui/components/authenticator/sign-in-totp-sms/sign-in-totp-sms.component';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';
import { SignInWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-in-with-phone/sign-in-with-phone.component';
import { SignInWithUsernameComponent } from 'src/pages/ui/components/authenticator/sign-in-with-username/sign-in-with-username.component';
import { SignUpWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-up-with-email/sign-up-with-email.component';
import { SignUpWithPhoneComponent } from 'src/pages/ui/components/authenticator/sign-up-with-phone/sign-up-with-phone.component';
import { SignUpComponent } from 'src/pages/ui/components/authenticator/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'ui/components/authenticator/sign-in-with-email',
    component: SignInWithEmailComponent,
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
    path: 'ui/components/authenticator/sign-in-with-phone',
    component: SignInWithPhoneComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-with-username',
    component: SignInWithUsernameComponent,
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
