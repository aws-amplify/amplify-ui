export const defaultFileUploaderDisplayText = {
  filesUploaded(count: number): string {
    return `${count} ${count === 1 ? 'file uploaded' : 'files uploaded'}`;
  },
  remainingFiles(count: number): string {
    return `${count} ${count === 1 ? 'file' : 'files'} selected`;
  },
  uploading(percentage: number): string {
    return `Uploading${percentage > 0 ? `: ${percentage}%` : ''}`;
  },
  uploadButton(count: number): string {
    return `Upload ${count} ${count === 1 ? 'file' : 'files'}`;
  },
  maxFilesError(count: number): string {
    return `Cannot choose more than ${count} ${
      count === 1 ? 'file' : 'files'
    }. Remove files before updating`;
  },
  error(message: string): string {
    return message;
  },
  doneButton: 'Done',
  clearButton: 'Clear all',
  extensionNotAllowed: 'Extension not allowed',
  browseFiles: 'Browse files',
  dropFiles: 'Drop files here or',
  pause: 'Pause',
  resume: 'Resume',
  uploadSuccessful: 'Uploaded successfully',
  paused(percentage: number): string {
    return `Paused: ${percentage}%`;
  },
};

export type FileUploaderDisplayText = typeof defaultFileUploaderDisplayText;
