export const STORAGE_IMAGE = [
  {
    name: 'alt',
    description: 'Alternative text description of the image',
    type: 'string',
  },
  {
    name: 'path',
    description: 'The path to the image in Storage. See TODO add link',
    type: 'string | ((input: { identityId?: string }) => string);',
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
