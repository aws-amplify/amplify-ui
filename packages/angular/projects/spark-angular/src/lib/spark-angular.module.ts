import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SparkAngularComponent } from './spark-angular.component';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifyContextProviderComponent } from './amplify-context-provider/amplify-context-provider.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifyInputComponent } from './primitives/amplify-input/amplify-input.component';

@NgModule({
  declarations: [
    SparkAngularComponent,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyContextProviderComponent,
    AmplifyOverrideDirective,
    AmplifySignUpComponent,
    AmplifyInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
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
