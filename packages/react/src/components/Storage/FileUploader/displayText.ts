export const defaultFileUploaderDisplayText = {
  filesUploadedText(count: number): string {
    return `${count} ${count === 1 ? 'file uploaded' : 'files uploaded'}`;
  },
  remainingFilesText(count: number): string {
    return `${count} ${count === 1 ? 'file' : 'files'} selected`;
  },
  uploadingText(percentage: number): string {
    return `Uploading${percentage > 0 ? `: ${percentage}%` : ''}`;
  },
  uploadButtonText(count: number): string {
    return `Upload ${count} ${count === 1 ? 'file' : 'files'}`;
  },
  maxFilesErrorText(count: number): string {
    return `Cannot choose more than ${count} ${
      count === 1 ? 'file' : 'files'
    }. Remove files before updating`;
  },
  errorText(message: string): string {
    return message;
  },
  doneButtonText: 'Done',
  clearButtonText: 'Clear all',
  extensionNotAllowedText: 'Extension not allowed',
  browseFilesText: 'Browse files',
  dropFilesText: 'Drop files here or',
  pauseText: 'Pause',
  resumeText: 'Resume',
  uploadSuccessfulText: 'Uploaded successfully',
  pausedText(percentage: number): string {
    return `Paused: ${percentage}%`;
  },
};

export type FileUploaderDisplayText = typeof defaultFileUploaderDisplayText;
