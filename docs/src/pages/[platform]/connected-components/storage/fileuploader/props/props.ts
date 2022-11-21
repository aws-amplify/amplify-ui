// backticks intentional to display as `code` block
export const UPLOAD_DROP_COMPONENTS = [
  {
    name: `inDropZone?`,
    description: 'Indicates if files are in drop zone',
    type: `boolean`,
  },
  {
    name: `onDragStart`,
    description: 'Event handler triggered when dragstart event is fired',
    type: `(event: React.DragEvent<HTMLDivElement>) => void`,
  },
  {
    name: `onDragEnter`,
    description: 'Event handler triggerred when dragenter event is fired',
    type: `(event: React.DragEvent<HTMLDivElement>) => void`,
  },
  {
    name: `onDragLeave`,
    description: 'Event handler triggerred when dragleave event is fired',
    type: `(event: React.DragEvent<HTMLDivElement>) => void`,
  },
  {
    name: `onDrop`,
    description: 'Event handler triggerred when drop event is fired',
    type: `(event: React.DragEvent<HTMLDivElement>) => void`,
  },
  {
    name: `onDragOver`,
    description: 'Event handler triggerred when dragover event is fired',
    type: `(event: React.DragEvent<HTMLDivElement>) => void`,
  },
];

// backticks intentional to display as `code` block
export const UPLOAD_BUTTON_COMPONENTS = [
  {
    name: `acceptedFileTypes`,
    description: 'List of file types allowed to be uploaded',
    type: `string[]`,
  },
  {
    name: `className?`,
    description: 'Class name prop',
    type: `string`,
  },
  {
    name: `hiddenInput`,
    description: 'Hidden Ref used to help select input element',
    type: `React.MutableRefObject<HTMLInputElement>`,
  },
  {
    name: `isLoading?`,
    description: 'Indicates if the file uploader is uploading',
    type: `boolean`,
  },
  {
    name: `multiple?`,
    description: 'Allows multiple files to be selected at once',
    type: `boolean`,
  },
  {
    name: `onClick`,
    description: 'Initiates adding files to file uploader',
    type: `() => void`,
  },

  {
    name: `onFileChange`,
    description: 'Change event handler that adds files to upload',
    type: `(event: React.ChangeEvent<HTMLInputElement>) => void`,
  },
];

const UPDATED_UPLOAD_PROPS = UPLOAD_BUTTON_COMPONENTS.filter(
  (prop) => prop.name !== 'onClick' && prop.name !== 'className?'
);

// backticks intentional to display as `code` block
export const PREVIEWER_COMPONENTS = [
  {
    name: `fileStatuses`,
    description: 'Array of files and their statuses',
    type: `FileStatuses`,
  },

  {
    name: `isSuccess`,
    description: 'Indicates if all files have completed uploading',
    type: `boolean`,
  },
  {
    name: `maxFilesError`,
    description: 'Indicates if there is a max file size error',
    type: `boolean`,
  },

  {
    name: `onClear`,
    description: 'Event handler that clears all files',
    type: `()=> void`,
  },

  {
    name: `onFileClick`,
    description: 'Event handler that triggers the upload to begin',
    type: `(event: React.ChangeEvent<HTMLInputElement>) => void`,
  },
  {
    name: `percentage`,
    description: 'Total percentage of files uploaded',
    type: `number`,
  },

  {
    name: `onUploadButtonClick`,
    description: 'Triggers event to add more files to file uploader',
    type: `()=> void`,
  },
  ...UPLOAD_DROP_COMPONENTS,
  ...UPDATED_UPLOAD_PROPS,
].sort((a, b) => (a.name > b.name ? 1 : -1));

// backticks intentional to display as `code` block
export const TRACKER_COMPONENTS = [
  {
    name: `errorMessage`,
    description: 'Displays error message',
    type: `string`,
  },
  {
    name: `file`,
    description: 'File information',
    type: `File`,
  },
  {
    name: `fileState`,
    description: 'File state information',
    type: `FileState`,
  },
  {
    name: `hasImage`,
    description: 'Is the file of a type image',
    type: `boolean`,
  },
  {
    name: `name`,
    description: 'Name of the file',
    type: `string`,
  },
  {
    name: `onCancel`,
    description: 'Cancels the upload',
    type: `()=> void`,
  },
  {
    name: `onCancelEdit`,
    description: 'Cancels the edit window',
    type: `()=> void`,
  },
  {
    name: `onPause`,
    description: 'Pauses the upload',
    type: `()=> void`,
  },
  {
    name: `onResume`,
    description: 'Resumes the upload',
    type: `() => void`,
  },
  {
    name: `onSaveEdit`,
    description: 'Saves the file name after editing it',
    type: `(value: string) => void`,
  },
  {
    name: `onStartEdit`,
    description: 'Sets the file state to editing',
    type: `(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void`,
  },
  {
    name: `percentage`,
    description: 'Percentage file has been uploaded',
    type: `number`,
  },
  {
    name: `resumable`,
    description: 'Indicates if upload can be resumable',
    type: `boolean`,
  },
  {
    name: `showImage`,
    description: 'Indicates if an image should be shown',
    type: `boolean`,
  },
  {
    name: `url`,
    description: 'Used for src of image to be displayed',
    type: `string`,
  },
];
