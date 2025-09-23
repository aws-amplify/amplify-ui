import type { ImageProps } from '@aws-amplify/ui-react';
import type { StorageBucket } from '../FileUploader/types';
import type React from 'react';

type StorageAccessLevel = 'guest' | 'protected' | 'private';

export interface StorageImageProps extends Omit<ImageProps, 'src'> {
  // Use imgKey instead of key because key is a reserved keyword
  // and cannot be accessed via props in React components
  // Note: a new Storage.get request is made only when the imgKey gets updated after the initial
  /**
   * @deprecated
   * `imgKey` will be replaced with `path` in a future major version of Amplify UI. See https://ui.docs.amplify.aws/react/connected-components/storage/storageimage#props
   */
  imgKey: string;
  /**
   * @deprecated
   * `accessLevel` will be replaced with `path` in a future major version of Amplify UI. See https://ui.docs.amplify.aws/react/connected-components/storage/storageimage#props
   */
  accessLevel: StorageAccessLevel;
  bucket?: never;
  /**
   * @deprecated
   * `identityId` will be replaced with `path` in a future major version of Amplify UI. See https://ui.docs.amplify.aws/react/connected-components/storage/storageimage#props
   */
  identityId?: string;
  fallbackSrc?: string;
  validateObjectExistence?: boolean;
  /**
   * @deprecated use `onGetUrlError`
   *
   * `onStorageGetError` will be replaced with `onGetUrlError` in a future major version of Amplify UI. See https://ui.docs.amplify.aws/react/connected-components/storage/storageimage#props
   */
  onStorageGetError?: (error: Error) => void;
  // Allow user to migrate from `onStorageGetError` without changing to `path` props
  onGetUrlError?: (error: Error) => void;
  // Creates a discriminated union between StorageImageProps and StorageImagePathProps
  path?: never;
  loadingElement?: React.ReactNode;
}

type OmittedPropKey =
  | 'accessLevel'
  | 'bucket' // include `bucket` to disallow `never` in `StorageImagePathProps`
  | 'imgKey'
  | 'identityId'
  | 'onStorageGetError'
  | 'path'; // include `path` to disallow `never` in `StorageImagePathProps`

export interface StorageImagePathProps
  extends Omit<StorageImageProps, OmittedPropKey> {
  path: string | ((input: { identityId?: string }) => string);
  imgKey?: never;
  accessLevel?: never;
  bucket?: StorageBucket;
  identityId?: never;
  onStorageGetError?: never;
}
