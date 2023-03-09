import type { UploadTask } from '@aws-amplify/storage';

export const isUploadTask = (value: unknown): value is UploadTask =>
  typeof (value as UploadTask)?.resume === 'function';
