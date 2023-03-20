export const defaultStorageManagerDisplayText = {
  getFilesUploadedText(count: number): string {
    return `${count} ${count === 1 ? 'file uploaded' : 'files uploaded'}`;
  },
  getRemainingFilesText(count: number): string {
    return `${count} ${count === 1 ? 'file' : 'files'} selected`;
  },
  getUploadingText(percentage: number): string {
    return `Uploading${percentage > 0 ? `: ${percentage}%` : ''}`;
  },
  getUploadButtonText(count: number): string {
    return `Upload ${count} ${count === 1 ? 'file' : 'files'}`;
  },
  getMaxFilesErrorText(count: number): string {
    return `Cannot choose more than ${count} ${
      count === 1 ? 'file' : 'files'
    }. Remove files before updating`;
  },
  getErrorText(message: string): string {
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
  getPausedText(percentage: number): string {
    return `Paused: ${percentage}%`;
  },
};

export type StorageManagerDisplayText = typeof defaultStorageManagerDisplayText;
