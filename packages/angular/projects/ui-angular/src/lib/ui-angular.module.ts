import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifyContextProviderComponent } from './amplify-context-provider/amplify-context-provider.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifyFormFieldComponent } from './primitives/amplify-form-field/amplify-form-field.component';
import { AmplifyValidationErrorComponent } from './primitives/amplify-validation-error/amplify-validation-error.component';

@NgModule({
  declarations: [
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyContextProviderComponent,
    AmplifySignUpComponent,
    AmplifyFormFieldComponent,
    AmplifyValidationErrorComponent,
    AmplifyOverrideDirective
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyContextProviderComponent,
    AmplifyFormFieldComponent,
    AmplifyValidationErrorComponent,
    AmplifyOverrideDirective
  ]
})
export class UiAngularModule {}
