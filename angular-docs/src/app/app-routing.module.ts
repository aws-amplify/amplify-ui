import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicAuthenticatorComponent } from './pages/basic-authenticator/basic-authenticator.component';
import { CustomComponentAuthenticatorComponent } from './pages/custom-component-authenticator/custom-component-authenticator.component';
import { HeadlessAuthenticatorComponent } from './pages/headless-authenticator/headless-authenticator.component';
import { StyledAuthenticatorComponent } from './pages/styled-authenticator/styled-authenticator.component';

const routes: Routes = [
  { path: '', component: BasicAuthenticatorComponent },
  { path: 'basic-authenticator', component: BasicAuthenticatorComponent },
  { path: 'headless-authenticator', component: HeadlessAuthenticatorComponent },
  { path: 'styled-authenticator', component: StyledAuthenticatorComponent },
  { path: 'custom-authenticator', component: CustomComponentAuthenticatorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
