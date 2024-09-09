const acceptedFileTypes = {
  name: `acceptedFileTypes`,
  description: 'List of accepted file types',
  type: `string[]`,
};

const children = {
  name: `children`,
  description: '',
  type: `React.ReactNode`,
};

const displayText = {
  name: `displayText`,
  description: 'Test strings that are used in the component',
  type: `FileUploaderDisplayText`,
};

const eventHandler = `(file: {key: string}) => void;`;

export const FILE_UPLOADER = [
  {
    name: `path`,
    description:
      "S3 bucket key prefixed to each upload target file `key`, allows either a `string` or a callback provided the value of the current user's `identityId`.",
    type: `string | (input: { identityId: string | undefined }) => string`,
  },
  {
    name: `path?`,
    description:
      'Optional when `accessLevel` is provided.  S3 bucket key prefixed to each upload target file `key`',
    type: `string`,
  },
  {
    name: `accessLevel`,
    description:
      'Deprecated in favor of `path`. S3 access level of upload target files. See https://docs.amplify.aws/gen1/react/build-a-backend/storage/configure-access/',
    type: `'guest' | 'protected' | 'private'`,
  },
  {
    name: `acceptedFileTypes?`,
    description:
      "List of accepted file types, values of `['*']` or undefined allow any files",
    type: `string[]`,
  },
  {
    name: `autoUpload?`,
    description:
      'Determines if the upload will automatically start after a file is selected. The default value is `true`',
    type: 'boolean',
  },
  {
    name: `maxFileCount`,
    description: '',
    type: 'integer',
  },
  {
    name: `maxFileSize?`,
    description: '',
    type: 'integer',
  },
  {
    name: `onUploadStart?`,
    description: 'Called when a file starts uploading',
    type: eventHandler,
  },
  {
    name: `onUploadSuccess?`,
    description: 'Called when a file successfully uploads',
    type: eventHandler,
  },
  {
    name: `onUploadError?`,
    description: 'Called when a error happens uploading a file',
    type: `(error: string, file: {key: string}) => void;`,
  },
  {
    name: `onFileRemove?`,
    description: 'Called when a file is removed',
    type: eventHandler,
  },
  {
    name: `processFile?`,
    description:
      'Called immediately before uploading a file to allow you to edit the key or the file itself. The function can return synchronously or return a promise.',
    type: `(params: {key: string, file: Blob}) => Promise<{key: string, file: Blob} & Record<string, any>> | {key: string, file: Blob} & Record<string, string>;`,
  },
  {
    name: `defaultFiles?`,
    description: 'An array of files that already exist in the cloud.',
    type: 'Array<{s3key: string}>',
  },
  {
    name: `displayText?`,
    description: 'Text to override in the component.',
    type: 'FileUploaderDisplayText',
  },
  {
    name: `useAccelerateEndpoint?`,
    description: 'Use the accelerated S3 endpoint to upload files.',
    type: 'boolean',
  },
  {
    name: `components?.Container?`,
    description: 'The container the FileUploader is wrapped in.',
    type: `React.ComponentType<ContainerProps>`,
  },
  {
    name: `components?.DropZone?`,
    description: 'The dropzone element which contains the FilePicker',
    type: `React.ComponentType<DropZoneProps>`,
  },
  {
    name: `components?.FilePicker?`,
    description: 'The button that opens the file picker menu.',
    type: `React.ComponentType<FilePickerProps>`,
  },
  {
    name: `components?.FileList?`,
    description: 'The list of files that is being uploaded.',
    type: `React.ComponentType<FileListProps>`,
  },
  {
    name: `components?.FileListHeader?`,
    description: 'The heading above the list of files',
    type: `React.ComponentType<FileListHeaderProps>`,
  },
  {
    name: `components?.FileListFooter?`,
    description: 'The footer below the list of files',
    type: `React.ComponentType<FileListFooterProps>`,
  },
  {
    name: `ref?`,
    description: 'Forward ref prop exposing FileUploader imperative methods.',
    type: `React.ForwardedRef<FileUploaderHandle>`,
  },
];

export const FILE_PICKER = [
  children,
  {
    name: 'onClick',
    description: '',
    type: `React.MouseEventHandler<HTMLButtonElement>`,
  },
];

const dragEvent = `(event: React.DragEvent<HTMLDivElement>) => void`;

export const DROPZONE_PROPS = [
  acceptedFileTypes,
  children,
  displayText,
  {
    name: 'isLoading?',
    description: '',
    type: `boolean`,
  },
  {
    name: 'onDragStart',
    description: '',
    type: dragEvent,
  },
  {
    name: 'onDragEnter',
    description: '',
    type: dragEvent,
  },
  {
    name: 'onDragLeave',
    description: '',
    type: dragEvent,
  },
  {
    name: 'onDragOver',
    description: '',
    type: dragEvent,
  },
  {
    name: 'onDrop',
    description: '',
    type: dragEvent,
  },
  {
    name: 'inDropZone',
    description: '',
    type: `boolean`,
  },
];

export const DISPLAY_TEXT = [
  {
    name: 'getFilesUploadedText?',
    description: '',
    type: `(count: number) => string`,
  },
  {
    name: 'getFileSizeErrorText?',
    description: '',
    type: `(sizeText: string) => string`,
  },
  {
    name: 'getRemainingFilesText?',
    description: '',
    type: `(count: number) => string`,
  },
  {
    name: 'getUploadingText?',
    description: '',
    type: `(percentage: number) => string`,
  },
  {
    name: 'getUploadButtonText?',
    description: '',
    type: `(count: number) => string`,
  },
  {
    name: 'getMaxFilesErrorText?',
    description: '',
    type: `(count: number) => string`,
  },
  {
    name: 'getErrorText?',
    description: '',
    type: `(message: string) => string`,
  },
  {
    name: 'getPausedText?',
    description: '',
    type: `(percentage: string) => string`,
  },
  {
    name: 'doneButtonText?',
    description: 'Default: "Done"',
    type: `string`,
  },
  {
    name: 'clearAllButtonText?',
    description: 'Default: "Clear all"',
    type: `string`,
  },
  {
    name: 'extensionNotAllowedText?',
    description: 'Default: "Extension not allowed"',
    type: `string`,
  },
  {
    name: 'browseFilesText?',
    description: 'Default: "Browse files"',
    type: `string`,
  },
  {
    name: 'dropFilesText?',
    description: 'Default: "Drop files here or"',
    type: `string`,
  },
  {
    name: 'pauseButtonText?',
    description: 'Default: "Pause"',
    type: `string`,
  },
  {
    name: 'resumeButtonText?',
    description: 'Default: "Resume"',
    type: `string`,
  },
  {
    name: 'uploadSuccessfulText?',
    description: 'Default: "Uploaded successfully"',
    type: `string`,
  },
];
