import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmplifyAuthenticatorComponent } from './components/amplify-authenticator/amplify-authenticator.component';
import { AmplifyConfirmSignInComponent } from './components/amplify-confirm-sign-in/amplify-confirm-sign-in.component';
import { AmplifyConfirmSignUpComponent } from './components/amplify-confirm-sign-up/amplify-confirm-sign-up.component';
import { AmplifyFederatedSignInButtonComponent } from './components/amplify-federated-sign-in-button/amplify-federated-sign-in-button.component';
import { AmplifyFederatedSignInComponent } from './components/amplify-federated-sign-in/amplify-federated-sign-in.component';
import { AmplifyForceNewPasswordComponent } from './components/amplify-force-new-password/amplify-force-new-password.component';
import { AmplifyResetPasswordComponent } from './components/amplify-reset-password/amplify-reset-password.component';
import { AmplifySetupTotpComponent } from './components/amplify-setup-totp/amplify-setup-totp.component';
import { AmplifySignInComponent } from './components/amplify-sign-in/amplify-sign-in.component';
import { AmplifySignUpComponent } from './components/amplify-sign-up/amplify-sign-up.component';
import { AmplifyVerifyUserComponent } from './components/amplify-verify-user/amplify-verify-user.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/amplify-confirm-reset-password.component';
import { ConfirmVerifyUserComponent } from './components/confirm-verify-user/amplify-confirm-verify-user.component';
import { AmplifyButtonComponent } from './primitives/amplify-button/amplify-button.component';
import { AmplifyErrorComponent } from './primitives/amplify-error/amplify-error.component';
import { AmplifyFormFieldComponent } from './primitives/amplify-form-field/amplify-form-field.component';
import { AmplifyPasswordFieldComponent } from './primitives/amplify-password-field/amplify-password-field.component';
import { AmplifySelectComponent } from './primitives/amplify-select/amplify-select.component';
import { TabsComponent } from './primitives/tabs/tabs.component';
import { TabItemComponent } from './primitives/tab-item/tab-item.component';
import { AmplifyTextFieldComponent } from './primitives/amplify-text-field/amplify-text-field.component';
import { AmplifyUserNameAliasComponent } from './primitives/amplify-user-name-alias/amplify-user-name-alias.component';
import { AmplifyOverrideDirective } from './directives/amplify-override.directive';

import {
  AmplifyS3Album as S3Album,
  AmplifyS3ImagePicker as S3ImagePicker,
  AmplifyS3Text as S3Text,
  AmplifyS3TextPicker as S3TextPicker,
  AmplifyS3Image as S3Image,
  AmplifyPicker as picker,
  AmplifyPhotoPicker as photoPicker,
  AmplifyChatbot as chatbot,
  AmplifyToast as toast,
  AmplifyInput as input,
  AmplifyButton as button,
} from './proxies';

import {
  AmplifyChatbot,
  AmplifyButton,
  AmplifyInput,
  AmplifyToast,
  AmplifyS3Album,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  AmplifyS3Image,
  AmplifyPicker,
  AmplifyPhotoPicker,
} from '@aws-amplify/ui-components/dist/components';

customElements.define('amplify-button', AmplifyButton);
customElements.define('amplify-input', AmplifyInput);
customElements.define('amplify-toast', AmplifyToast);
customElements.define('amplify-chatbot', AmplifyChatbot);
customElements.define('amplify-s3-album', AmplifyS3Album);
customElements.define('amplify-s3-image-picker', AmplifyS3ImagePicker);
customElements.define('amplify-s3-text', AmplifyS3Text);
customElements.define('amplify-s3-text-picker', AmplifyS3TextPicker);
customElements.define('amplify-s3-image', AmplifyS3Image);
customElements.define('amplify-picker', AmplifyPicker);
customElements.define('amplify-photo-picker', AmplifyPhotoPicker);

@NgModule({
  declarations: [
    chatbot,
    toast,
    input,
    button,
    S3Album,
    S3ImagePicker,
    S3Text,
    S3TextPicker,
    S3Image,
    picker,
    photoPicker,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifySignUpComponent,
    AmplifyFormFieldComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
    AmplifyConfirmSignUpComponent,
    AmplifyUserNameAliasComponent,
    AmplifyConfirmSignInComponent,
    AmplifySetupTotpComponent,
    AmplifyForceNewPasswordComponent,
    AmplifyFederatedSignInComponent,
    AmplifyFederatedSignInButtonComponent,
    AmplifyResetPasswordComponent,
    AmplifyVerifyUserComponent,
    ConfirmResetPasswordComponent,
    ConfirmVerifyUserComponent,
    AmplifySelectComponent,
    AmplifyButtonComponent,
    AmplifyPasswordFieldComponent,
    AmplifyTextFieldComponent,
    TabsComponent,
    TabItemComponent,
  ],
  imports: [CommonModule],
  exports: [
    chatbot,
    toast,
    input,
    button,
    S3Album,
    S3ImagePicker,
    S3Text,
    S3TextPicker,
    S3Image,
    picker,
    photoPicker,
    AmplifyAuthenticatorComponent,
    AmplifySignInComponent,
    AmplifyFormFieldComponent,
    AmplifyErrorComponent,
    AmplifyOverrideDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UiAngularModule {}
