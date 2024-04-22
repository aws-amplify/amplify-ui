import { StorageAccessLevel } from '@aws-amplify/core';
import { ImageProps } from '@aws-amplify/ui-react';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  // Note: a new Storage.get request is made only when the imgKey gets updated after the initial
  imgKey: string;
  accessLevel: StorageAccessLevel;
  identityId?: string;
  fallbackSrc?: string;
  validateObjectExistence?: boolean;
  onStorageGetError?: (error: Error) => void;
  // Creates a discriminated union between StorageImageProps and StorageImagePathProps
  path?: never;
}
export interface StorageImagePathProps extends Omit<ImageProps, 'src'> {
  path: string | ((input: { identityId?: string }) => string);
  onGetUrlError?: (error: Error) => void;
  validateObjectExistence?: boolean;
}
