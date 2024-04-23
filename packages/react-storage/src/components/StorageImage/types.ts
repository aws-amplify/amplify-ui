import { StorageAccessLevel } from '@aws-amplify/core';
import { ImageProps } from '@aws-amplify/ui-react';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  // Note: a new Storage.get request is made only when the imgKey gets updated after the initial
  /**
   * @deprecated
   * `imgKey` will be replaced with `path` in the next major version of Amplify UI
   */
  imgKey: string;
  /**
   * @deprecated
   * `accessLevel` will be replaced with `path` in the next major version of Amplify UI
   */
  accessLevel: StorageAccessLevel;
  /**
   * @deprecated
   * `identityId` will be replaced with `path` in the next major version of Amplify UI
   */
  identityId?: string;
  fallbackSrc?: string;
  validateObjectExistence?: boolean;
  /**
   * @deprecated
   * `onStorageGetError` will be replaced with `onGetUrlError` in the next major version of Amplify UI
   */
  onStorageGetError?: (error: Error) => void;
  // Allow user to migrate from `onStorageGetError` without changing to `path` props
  onGetUrlError?: (error: Error) => void;
  // Creates a discriminated union between StorageImageProps and StorageImagePathProps
  path?: never;
}

type OmittedPropKey =
  | 'accessLevel'
  | 'imgKey'
  | 'identityId'
  | 'onStorageGetError'
  | 'path'; // include `path` to disallow `never` in `StorageImagePathProps`
export interface StorageImagePathProps
  extends Omit<StorageImageProps, OmittedPropKey> {
  path: string | ((input: { identityId?: string }) => string);
  imgKey?: never;
  accessLevel?: never;
  identityId?: never;
  onStorageGetError?: never;
}
