import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { docRoutes } from './common/routes';

const routes: Routes = docRoutes.map((route) => ({
  path: route.path,
  component: route.component,
}));

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
