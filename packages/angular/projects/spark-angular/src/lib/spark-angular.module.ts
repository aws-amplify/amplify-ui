import { NgModule } from '@angular/core';
import { SparkAngularComponent } from './spark-angular.component';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { CommonModule } from '@angular/common';
import { AmplifyContextProviderComponent } from './amplify-context-provider/amplify-context-provider.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';

@NgModule({
  declarations: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyContextProviderComponent,
    AmplifyOverrideDirective,
  ],
  imports: [CommonModule],
  exports: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyContextProviderComponent,
    AmplifyOverrideDirective,
  ],
})
export class SparkAngularModule {}
