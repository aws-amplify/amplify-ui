import { NgModule } from '@angular/core';
import { SparkAngularComponent } from './spark-angular.component';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { CommonModule } from '@angular/common';
import { SparkContextProviderComponent } from './spark-context-provider/spark-context-provider.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';

@NgModule({
  declarations: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    SparkContextProviderComponent,
    AmplifyOverrideDirective,
  ],
  imports: [CommonModule],
  exports: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    SparkContextProviderComponent,
    AmplifyOverrideDirective,
  ],
})
export class SparkAngularModule {}
