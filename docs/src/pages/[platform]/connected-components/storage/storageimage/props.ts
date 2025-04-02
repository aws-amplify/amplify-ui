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
    name: 'bucket?',
    description:
      'The S3 bucket which be will accessed. Allows either a string containing the user-assigned "friendly name" or an object containing a combination of the backend-assigned name on S3 and the S3 region.',
    type: 'string | { bucketName: string, region: string }',
  },
  {
    name: 'imgKey',
    description:
      'Deprecated, use path instead. The key of an image. See https://docs.amplify.aws/gen1/react/build-a-backend/storage/download/',
    type: 'string',
  },
  {
    name: 'accessLevel',
    description:
      'Deprecated, use path instead. Access level for files in Storage. See https://docs.amplify.aws/gen1/react/build-a-backend/storage/configure-access/',
    type: `'guest' | 'protected' | 'private'`,
  },
  {
    name: 'identityId?',
    description:
      'Deprecated, use path instead. The unique Amazon Cognito Identity ID of the image owner.',
    type: 'string',
  },
  {
    name: 'fallbackSrc?',
    description:
      'A fallback image source to be loaded when the component fails to load the image from Storage',
    type: 'string',
  },
  {
    name: 'loadingElement?',
    description:
      'A React element to be loaded when the component is loading the image from Storage.',
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
      'Whether to check for the existence of a file. Defaults to true. See https://docs.amplify.aws/react/build-a-backend/storage/download-files/#more-geturl-options',
    type: `boolean`,
  },
];
