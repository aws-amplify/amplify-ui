import { NgModule } from '@angular/core';
import { SparkAngularComponent } from './spark-angular.component';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { CommonModule } from '@angular/common';
import { SparkContextProviderComponent } from './spark-context-provider/spark-context-provider.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';

@NgModule({
  declarations: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    SparkContextProviderComponent,
  ],
  imports: [CommonModule],
  exports: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    SparkContextProviderComponent,
  ],
})
export class SparkAngularModule {}
