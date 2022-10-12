import { IS_REACT_NATIVE_ENABLED } from '@/utils/featureFlags';

export type Framework =
  | 'angular'
  | 'flutter'
  | 'react'
  | 'react-native'
  | 'vue';
export type Frameworks = Framework[];

export const FRAMEWORKS: Frameworks = IS_REACT_NATIVE_ENABLED
  ? ['angular', 'flutter', 'react', 'react-native', 'vue']
  : ['angular', 'flutter', 'react', 'vue'];

const BASE_FRAMEWORK_DISPLAY_NAMES = {
  angular: 'Angular',
  flutter: 'Flutter',
  react: 'React',
  vue: 'Vue',
};

export const FRAMEWORK_DISPLAY_NAMES = IS_REACT_NATIVE_ENABLED
  ? {
      ...BASE_FRAMEWORK_DISPLAY_NAMES,
      'react-native': 'React Native',
    }
  : BASE_FRAMEWORK_DISPLAY_NAMES;

// React Native requires direct installation of dependencies with native modules
export const REACT_NATIVE_DEPENDENCIES =
  '@react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values react-native-url-polyfill react-native-safe-area-context';

export const FRAMEWORK_INSTALL_SCRIPTS = {
  react: 'npm i @aws-amplify/ui-react aws-amplify',
  vue: 'npm i @aws-amplify/ui-vue aws-amplify',
  angular: 'npm i @aws-amplify/ui-angular aws-amplify',
  flutter: 'flutter pub add amplify_authenticator',
  'react-native': `npm i -E @aws-amplify/ui-react-native aws-amplify ${REACT_NATIVE_DEPENDENCIES}`,
};
