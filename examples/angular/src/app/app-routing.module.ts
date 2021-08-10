import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInWithEmailComponent } from 'src/pages/ui/components/authenticator/sign-in-with-email/sign-in-with-email.component';

const routes: Routes = [
  {
    path: 'ui/components/authenticator/sign-in-with-email',
    component: SignInWithEmailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
