import { isDev } from '@/utils/isDev';

export type Frameworks = string[];

export const FRAMEWORKS: Frameworks = isDev
  ? ['angular', 'flutter', 'react', 'react native', 'vue']
  : ['angular', 'flutter', 'react', 'vue'];
