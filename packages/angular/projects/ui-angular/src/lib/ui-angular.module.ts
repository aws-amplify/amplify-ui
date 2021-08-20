import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifySignOutComponent } from './components/amplify-sign-out/amplify-sign-out.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifyInputComponent } from './primitives/amplify-input/amplify-input.component';
import { AmplifyErrorComponent } from './primitives/amplify-error/amplify-error.component';
import { AmplifyConfirmSignUpComponent } from './components/amplify-confirm-sign-up/amplify-confirm-sign-up.component';
import { AmplifyUserNameAliasComponent } from './primitives/amplify-user-name-alias/amplify-user-name-alias.component';
import { AmplifyConfirmSignInComponent } from './components/amplify-confirm-sign-in/amplify-confirm-sign-in.component';
import { AmplifySetupTotpComponent } from './components/amplify-setup-totp/amplify-setup-totp.component';
import { AmplifyForceNewPasswordComponent } from './components/amplify-force-new-password/amplify-force-new-password.component';
import { AmplifyFederatedSignInComponent } from './components/amplify-federated-sign-in/amplify-federated-sign-in.component';
import { AmplifyFederatedSignInButtonComponent } from './components/amplify-federated-sign-in-button/amplify-federated-sign-in-button.component';

import {
  AmplifyS3Album,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  AmplifyS3Image,
  AmplifyPicker,
  AmplifyPhotoPicker,
  AmplifyChatbot as chatbot,
  AmplifyToast as toast,
  AmplifyInput as input,
  AmplifyButton as button,
} from './directives/proxies';

import {
  AmplifyChatbot,
  AmplifyButton,
  AmplifyInput,
  AmplifyToast,
} from '@aws-amplify/ui-components/dist/components';
customElements.define('amplify-button', AmplifyButton);
customElements.define('amplify-input', AmplifyInput);
customElements.define('amplify-toast', AmplifyToast);
customElements.define('amplify-chatbot', AmplifyChatbot);
@NgModule({
  declarations: [
    chatbot,
    toast,
    input,
    button,
    AmplifyS3Album,
    AmplifyS3ImagePicker,
    AmplifyS3Text,
    AmplifyS3TextPicker,
    AmplifyS3Image,
    AmplifyPicker,
    AmplifyPhotoPicker,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifySignUpComponent,
    AmplifyInputComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
    AmplifyConfirmSignUpComponent,
    AmplifyUserNameAliasComponent,
    AmplifyConfirmSignInComponent,
    AmplifySetupTotpComponent,
    AmplifyForceNewPasswordComponent,
    AmplifyFederatedSignInComponent,
    AmplifyFederatedSignInButtonComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    chatbot,
    toast,
    input,
    button,
    AmplifyS3Album,
    AmplifyS3ImagePicker,
    AmplifyS3Text,
    AmplifyS3TextPicker,
    AmplifyS3Image,
    AmplifyPicker,
    AmplifyPhotoPicker,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignOutComponent,
    AmplifyInputComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiAngularModule {}
