import { isReactNativeEnabled } from '@/utils/featureFlags';

export type Frameworks = string[];

export const FRAMEWORKS: Frameworks = isReactNativeEnabled
  ? ['angular', 'flutter', 'react', 'react native', 'vue']
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
      'react native': 'React Native',
    }
  : BASE_FRAMEWORK_DISPLAY_NAMES;
