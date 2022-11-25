// backticks intentional to display as `code` block
export const UPLOAD_DROP_COMPONENTS = [
  {
    name: `children?`,
    description: 'React Children',
    type: `React.ReactNode`,
  },
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
    name: `className?`,
    description: 'Class name prop',
    type: `string`,
  },
  {
    name: `isDisabled?`,
    description: 'Indicates if the file uploader is uploading',
    type: `boolean`,
  },
  {
    name: `onClick`,
    description: 'Initiates adding files to file uploader',
    type: `() => void`,
  },
];

// backticks intentional to display as `code` block
export const PREVIEWER_COMPONENTS = [
  {
    name: `aggregatePercentage`,
    description: 'Total percentage of files uploaded',
    type: `number`,
  },
  {
    name: `children?`,
    description: 'React Children',
    type: `React.ReactNode`,
  },
  {
    name: `dropZone`,
    description: 'Drop zone component',
    type: `React.ReactNode`,
  },
  {
    name: `fileStatuses`,
    description: 'Array of files and their statuses',
    type: `FileStatuses`,
  },
  {
    name: `hasMaxFilesError`,
    description: 'Indicates if there is a max file size error',
    type: `boolean`,
  },
  {
    name: `isLoading?`,
    description: 'Indicates if the file uploader is uploading',
    type: `boolean`,
  },

  {
    name: `isSuccessful`,
    description: 'Indicates if all files have completed uploading',
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
];

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
    name: `onChange`,
    description: 'Updates text from edit name',
    type: `(event: React.ChangeEvent<HTMLInputElement>) => void;`,
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
    name: `isResumable`,
    description: 'Indicates if upload can be resumable',
    type: `boolean`,
  },
  {
    name: `showImage`,
    description: 'Indicates if an image should be shown',
    type: `boolean`,
  },
];
