export type Framework =
  | 'android'
  | 'angular'
  | 'flutter'
  | 'react'
  | 'react-native'
  | 'swift'
  | 'svelte'
  | 'vue';
export type Frameworks = Framework[];

export const FRAMEWORKS: Frameworks = [
  'android',
  'angular',
  'flutter',
  'react',
  'react-native',
  'svelte',
  'swift',
  'vue',
];

export const FRAMEWORK_DISPLAY_NAMES: Record<Framework, string> = {
  android: 'Android',
  angular: 'Angular',
  flutter: 'Flutter',
  react: 'React',
  'react-native': 'React Native',
  swift: 'Swift',
  svelte: 'Svelte',
  vue: 'Vue',
};

export const CURRENT_MAJOR_VERSIONS: Record<string, number> = {
  angular: 5,
  'aws-amplify': 6,
  react: 6,
  'react-native': 2,
  svelte: 1,
  vue: 4,
};

export const PREV_MAJOR_VERSIONS: Record<string, number> = {
  angular: 4,
  'aws-amplify': 5,
  react: 5,
  'react-native': 1,
  vue: 3,
};

export const AMPLIFY_5_UI_VERSIONS: Record<string, number> = {
  angular: 4,
  'aws-amplify': 5,
  react: 5,
  'react-native': 1,
  vue: 3,
};

// React Native requires direct installation of dependencies with native modules
export const REACT_NATIVE_DEPENDENCIES =
  '@aws-amplify/react-native react-native-safe-area-context @react-native-community/netinfo @react-native-async-storage/async-storage react-native-get-random-values';

export const FRAMEWORK_INSTALL_SCRIPTS = {
  react: 'npm i @aws-amplify/ui-react aws-amplify',
  vue: 'npm i @aws-amplify/ui-vue aws-amplify',
  svelte: 'npm i @aws-amplify/ui-svelte aws-amplify',
  angular: 'npm i @aws-amplify/ui-angular aws-amplify',
  flutter: 'flutter pub add amplify_authenticator',
  android: "implementation 'com.amplifyframework.ui:liveness:1.5.0'",
  'react-native': `npm i @aws-amplify/ui-react-native aws-amplify ${REACT_NATIVE_DEPENDENCIES}`,
};
