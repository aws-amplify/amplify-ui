import type { StorageAccessLevel } from '@aws-amplify/storage';
import type { ImageProps } from '@aws-amplify/ui-react';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  imgKey: string;
  accessLevel: StorageAccessLevel;
  identityId?: string;
  fallbackSrc?: string;
  onStorageError?: (error: Error) => void;
}
