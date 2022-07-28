import { isReactNativeEnabled } from '@/utils/featureFlags';

export type Frameworks = string[];

export const FRAMEWORKS: Frameworks = isReactNativeEnabled
  ? ['angular', 'flutter', 'react', 'react native', 'vue']
  : ['angular', 'flutter', 'react', 'vue'];
