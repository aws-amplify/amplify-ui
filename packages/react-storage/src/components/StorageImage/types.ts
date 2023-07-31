import type { StorageAccessLevel } from '@aws-amplify/storage';
import type { ImageProps } from '@aws-amplify/ui-react';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  // Note: a new Storage.get request is made only when the imgKey gets updated after the initial
  imgKey: string;
  accessLevel: StorageAccessLevel;
  identityId?: string;
  fallbackSrc?: string;
  onStorageGetError?: (error: Error) => void;
}
