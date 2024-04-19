import { StorageAccessLevel } from '@aws-amplify/core';
import { ImageProps } from '@aws-amplify/ui-react';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  // Note: a new Storage.get request is made only when the imgKey gets updated after the initial
  /**
   * @deprecated
   * `imgKey` will be replaced with `path` in future major versions of Amplify UI
   */
  imgKey: string;
  /**
   * @deprecated
   * `accessLevel` will be replaced with `path` in future major versions of Amplify UI
   */
  accessLevel: StorageAccessLevel;
  /**
   * @deprecated
   * `identityId` will be replaced with `path` in future major versions of Amplify UI
   */
  identityId?: string;
  /**
   * @deprecated
   * `fallbackSrc` will be removed in future major versions of Amplify UI
   */
  fallbackSrc?: string;
  validateObjectExistence?: boolean;
  /**
   * @deprecated
   * `onStorageGetError` will be replaced with `onGetUrlError` in future major versions of Amplify UI
   */
  onStorageGetError?: (error: Error) => void;
  // Creates a discriminated union between StorageImageProps and StorageImagePathProps
  path?: never;
}
export interface StorageImagePathProps extends Omit<ImageProps, 'src'> {
  path: string | ((input: { identityId?: string }) => string);
  onGetUrlError?: (error: Error) => void;
  validateObjectExistence?: boolean;
}
