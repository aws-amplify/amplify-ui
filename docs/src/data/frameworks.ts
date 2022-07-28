import { isReactNativeEnabled } from '@/utils/featureFlags';

export type Frameworks = string[];

export const FRAMEWORKS: Frameworks = isReactNativeEnabled
  ? ['angular', 'flutter', 'react', 'react native', 'vue']
  : ['angular', 'flutter', 'react', 'vue'];

export const FRAMEWORK_DISPLAY_NAMES = {
  angular: 'Angular',
  flutter: 'Flutter',
  react: 'React',
  'react native': 'React Native',
  vue: 'Vue',
};
