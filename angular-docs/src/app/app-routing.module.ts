import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { docRoutes } from './common/routes';
import { BasicAuthenticatorComponent } from './pages/basic-authenticator/basic-authenticator.component';

const routes: Routes = docRoutes.map((route) => ({
  path: route.path,
  component: route.component,
}));
routes.push({
  path: '',
  component: BasicAuthenticatorComponent, // add default page
});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
