// Re-export internal apis & types of `@aws-amplify/storage/internals` in a single file
// eslint-disable-next-line import/no-extraneous-dependencies
export type {
  AWSTemporaryCredentials,
  CopyInput,
  CopyOutput,
  CredentialsLocation,
  CredentialsProvider,
  GetUrlInput,
  ListLocations,
  ListLocationsOutput,
  ListOutput,
  ListPaginateInput,
  LocationAccess,
  LocationCredentials,
  LocationCredentialsProvider,
  Permission,
  RemoveInput,
  StorageAccess,
  StorageSubpathStrategy,
  UploadDataInput,
  ListPathsOutput,
} from '@aws-amplify/storage/internals';
// eslint-disable-next-line import/no-extraneous-dependencies
export {
  StorageValidationErrorCode,
  assertValidationError,
  copy,
  getDataAccess,
  getUrl,
  list,
  listCallerAccessGrants,
  listPaths,
  remove,
  uploadData,
  validationErrorMap,
} from '@aws-amplify/storage/internals';
