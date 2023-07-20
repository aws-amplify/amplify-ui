export const STORAGE_IMAGE = [
  {
    name: 'alt',
    description: 'Alternative text description of the image',
    type: 'string',
  },
  {
    name: 'imgKey',
    description: 'The key of an image.',
    type: 'string',
  },
  {
    name: 'accessLevel',
    description:
      'Access level for files in Storage. See https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/',
    type: `'public' | 'private' | 'protected'`,
  },
  {
    name: 'identityId?',
    description:
      'The unique Amazon Cognito Identity ID of the image owner. Required when loading a protected image.',
    type: 'string',
  },
  {
    name: 'fallbackSrc?',
    description:
      'A fallback image source to be loaded when the component fails to load the image from Storage',
    type: 'string',
  },
  {
    name: 'onStorageGetError?',
    description: 'Triggered when an error happens calling Storage.get',
    type: `(error: Error) => void;`,
  },
];
