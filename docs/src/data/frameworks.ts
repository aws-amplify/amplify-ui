import { isReactNativeEnabled } from '@/utils/featureFlags';

export type Frameworks = string[];

export const FRAMEWORKS: Frameworks = isReactNativeEnabled
  ? ['angular', 'flutter', 'react', 'react-native', 'vue']
  : ['angular', 'flutter', 'react', 'vue'];

const BASE_FRAMEWORK_DISPLAY_NAMES = {
  angular: 'Angular',
  flutter: 'Flutter',
  react: 'React',
  vue: 'Vue',
};

export const FRAMEWORK_DISPLAY_NAMES = isReactNativeEnabled
  ? {
      ...BASE_FRAMEWORK_DISPLAY_NAMES,
      'react-native': 'React Native',
    }
  : BASE_FRAMEWORK_DISPLAY_NAMES;

export const FRAMEWORK_INSTALL_SCRIPTS = {
  react: `npm i @aws-amplify/ui-react aws-amplify`,
  vue: `npm i @aws-amplify/ui-vue aws-amplify`,
  angular: `npm i @aws-amplify/ui-angular aws-amplify`,
  flutter: 'flutter pub add amplify_authenticator',
  // add other deps here
  'react-native': `npm i @aws-amplify/ui-react-native aws-amplify`,
};
