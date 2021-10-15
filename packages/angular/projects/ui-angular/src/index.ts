/*
 * Public API Surface of ui-angular
 */

export * from './lib/ui-angular.module';
export * from './legacy/legacy-ui-angular.module';

export * from './lib/common';
export * from './lib/components';
export * from './lib/primitives';
export * from './lib/services/authenticator-context.service';
export * from './lib/services/state-machine.service';
export * from './lib/directives/amplify-slot.directive';

export {
  AmplifyButton,
  AmplifyChatbot,
  AmplifyIcon,
  AmplifyInput,
  AmplifyPhotoPicker,
  AmplifyPicker,
  AmplifyS3Album,
  AmplifyS3Image,
  AmplifyS3ImagePicker,
  AmplifyS3Text,
  AmplifyS3TextPicker,
  AmplifyToast,
} from './legacy/proxies';
