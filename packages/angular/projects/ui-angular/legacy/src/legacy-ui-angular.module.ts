import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  AmplifyIcon as icon,
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
  AmplifyIcon,
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
customElements.define('amplify-icon', AmplifyIcon);

@NgModule({
  declarations: [
    chatbot,
    toast,
    icon,
    input,
    button,
    S3Album,
    S3ImagePicker,
    S3Text,
    S3TextPicker,
    S3Image,
    picker,
    photoPicker,
  ],
  imports: [CommonModule],
  exports: [
    chatbot,
    toast,
    icon,
    input,
    button,
    S3Album,
    S3ImagePicker,
    S3Text,
    S3TextPicker,
    S3Image,
    picker,
    photoPicker,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LegacyAmplifyUiModule {}
