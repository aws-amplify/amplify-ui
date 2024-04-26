export const STORAGE_IMAGE = [
  {
    name: 'alt',
    description: 'Alternative text description of the image',
    type: 'string',
  },
  {
    name: 'path',
    description:
      'The path to the image in Storage, representing a full S3 object key. See https://docs.amplify.aws/react/build-a-backend/storage/download-files/',
    type: 'string | ((input: { identityId?: string }) => string);',
  },
  {
    name: 'imgKey',
    description: 'Deprecated, use path instead. The key of an image.',
    type: 'string',
  },
  {
    name: 'accessLevel',
    description:
      'Deprecated, use path instead. Access level for files in Storage. See https://docs.amplify.aws/gen1/javascript/build-a-backend/storage/configure-access/',
    type: `'guest' | 'protected' | 'private'`,
  },
  {
    name: 'identityId?',
    description:
      'Deprecated, use path instead. The unique Amazon Cognito Identity ID of the image owner. Required when loading a protected or private image.',
    type: 'string',
  },
  {
    name: 'fallbackSrc?',
    description:
      'A fallback image source to be loaded when the component fails to load the image from Storage',
    type: 'string',
  },
  {
    name: 'onGetUrlError?',
    description: 'Triggered when an error happens calling Storage.get',
    type: `(error: Error) => void;`,
  },
  {
    name: 'onStorageGetError?',
    description:
      'Deprecated, use onGetUrlError instead. Triggered when an error happens calling Storage.get',
    type: `(error: Error) => void;`,
  },
  {
    name: 'validateObjectExistence?',
    description:
      'Whether to check for the existence of a file. Defaults to true. See https://docs.amplify.aws/javascript/build-a-backend/storage/download/#check-for-existence-of-a-file',
    type: `boolean`,
  },
];
