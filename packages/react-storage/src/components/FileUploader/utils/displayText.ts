import { DisplayTextTemplate } from '@aws-amplify/ui';
import { FileStatus } from '../types';

export type FileUploaderDisplayText = DisplayTextTemplate<{
  getFilesUploadedText?: (count: number) => string;
  getFileSizeErrorText?: (sizeText: string) => string;
  getRemainingFilesText?: (count: number) => string;
  getSelectedFilesText?: (count: number) => string;
  getUploadingText?: (percentage: number) => string;
  getUploadButtonText?: (count: number) => string;
  getMaxFilesErrorText?: (count: number) => string;
  getErrorText?: (message: string) => string;
  getStatusAnnouncementText?: (
    status: FileStatus,
    percentage?: number
  ) => string;
  doneButtonText?: string;
  clearAllButtonText?: string;
  extensionNotAllowedText?: string;
  browseFilesText?: string;
  dropFilesText?: string;
  pauseButtonText?: string;
  resumeButtonText?: string;
  uploadSuccessfulText?: string;
  getPausedText?: (percentage: number) => string;
}>;

export type FileUploaderDisplayTextDefault = Required<FileUploaderDisplayText>;

export const defaultFileUploaderDisplayText: FileUploaderDisplayTextDefault = {
  getFilesUploadedText(count: number): string {
    return `${count} ${count === 1 ? 'file uploaded' : 'files uploaded'}`;
  },
  getFileSizeErrorText(sizeText: string): string {
    return `File size must be below ${sizeText}`;
  },
  getRemainingFilesText(count: number): string {
    return `${count} ${count === 1 ? 'file' : 'files'} uploading`;
  },
  getSelectedFilesText(count: number): string {
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
  getStatusAnnouncementText(status: FileStatus, percentage?: number): string {
    switch (status) {
      case FileStatus.UPLOADING:
        return `File upload status changed: Uploading ${percentage}%`;
      case FileStatus.PAUSED:
        return `File upload status changed: Paused at ${percentage}%`;
      case FileStatus.UPLOADED:
        return `File upload status changed: Upload completed successfully`;
      case FileStatus.ERROR:
        return `File upload status changed: Error`;
      case FileStatus.QUEUED:
        return `File upload status changed: Queued`;
      default:
        return '';
    }
  },
  doneButtonText: 'Done',
  clearAllButtonText: 'Clear all',
  extensionNotAllowedText: 'Extension not allowed',
  browseFilesText: 'Browse files',
  dropFilesText: 'Drop files here or',
  pauseButtonText: 'Pause',
  resumeButtonText: 'Resume',
  uploadSuccessfulText: 'Uploaded',
  getPausedText(percentage: number): string {
    return `Paused: ${percentage}%`;
  },
};
