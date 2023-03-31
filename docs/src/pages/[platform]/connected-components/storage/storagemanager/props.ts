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
  type: `StorageManagerDisplayText`,
};

export const STORAGE_MANAGER = [
  {
    name: `acceptedFileTypes`,
    description: 'List of accepted file types',
    type: `string[]`,
  },
  {
    name: `accessLevel`,
    description:
      'Access level for files in Storage. See https://docs.amplify.aws/lib/storage/configureaccess/q/platform/js/',
    type: `'public' | 'private' | 'protected'`,
  },
  {
    name: `maxFileCount`,
    description: '',
    type: 'integer',
  },
  {
    name: `defaultFiles?`,
    description: 'An array of files that already exist in the cloud.',
    type: 'Array<{s3key: string}>',
  },
  {
    name: `displayText?`,
    description: 'Text to override in the component.',
    type: 'Partial<StorageManagerDisplayText>',
  },
  {
    name: `components?.Container?`,
    description: 'The container the StorageManager is wrapped in.',
    type: `(props: ContainerProps) => JSX.Element;`,
  },
  {
    name: `components?.DropZone?`,
    description: 'The dropzone element which contains the FilePicker',
    type: `(props: DropZoneProps) => JSX.Element;`,
  },
  {
    name: `components?.FilePicker?`,
    description: 'The button that opens the file picker menu.',
    type: `(props: FilePickerProps) => JSX.Element;`,
  },
  {
    name: `components?.FileList?`,
    description: 'The list of files that is being uploaded.',
    type: `(props: FileListProps) => JSX.Element;`,
  },
  {
    name: `components?.FileListHeader?`,
    description: 'The heading above the list of files',
    type: `(props: FileListHeaderProps) => JSX.Element;`,
  },
];

export const FILE_PICKER = [
  acceptedFileTypes,
  displayText,
  {
    name: 'allowMultipleFiles',
    description: '',
    type: `boolean`,
  },
  {
    name: 'onFileChange',
    description: 'Event handler that will go on a file input',
    type: `(event: React.ChangeEvent<HTMLInputElement>) => void`,
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
    name: 'pauseText?',
    description: 'Default: "Pause"',
    type: `string`,
  },
  {
    name: 'resumeText?',
    description: 'Default: "Resume"',
    type: `string`,
  },
  {
    name: 'uploadSuccessfulText?',
    description: 'Default: "Uploaded successfully"',
    type: `string`,
  },
];
