import { Routes } from '@angular/router';
import { AuthStatusComponent } from 'src/pages/ui/components/authenticator/auth-status/auth-status.component';
import { SignInFederatedComponent } from 'src/pages/ui/components/authenticator/sign-in-federated/sign-in-federated.component';

export const routes: Routes = [
  {
    path: 'ui/components/authenticator/auth-status',
    component: AuthStatusComponent,
  },
  {
    path: 'ui/components/authenticator/sign-in-federated',
    component: SignInFederatedComponent,
  },
];
