import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import type { DefaultUploadViewDisplayText } from '../../types';
import { isFileTooBig } from '../../../validators';

export const DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT: DefaultUploadViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  actionStartLabel: 'Upload',
  addFilesLabel: 'Add files',
  addFolderLabel: 'Add folder',
  getActionCompleteMessage: (data) => {
    const { counts } = data ?? {};
    const { COMPLETE, FAILED, OVERWRITE_PREVENTED, CANCELED, TOTAL } =
      counts ?? {};

    const hasPreventedOverwrite = !!OVERWRITE_PREVENTED;
    const hasFailure = !!FAILED;
    const hasSuccess = !!COMPLETE;
    const hasCanceled = !!CANCELED;

    const type = hasFailure
      ? 'error'
      : hasPreventedOverwrite || hasCanceled
      ? 'warning'
      : 'success';

    const preventedOverwriteMessage = hasPreventedOverwrite
      ? [
          'Overwrite prevented for',
          OVERWRITE_PREVENTED === TOTAL ? 'all' : String(OVERWRITE_PREVENTED),
          OVERWRITE_PREVENTED > 1 || OVERWRITE_PREVENTED === TOTAL
            ? `files`
            : 'file',
        ].join(' ')
      : undefined;

    const canceledMessage = hasCanceled
      ? [
          CANCELED === TOTAL ? 'All' : String(CANCELED),
          CANCELED > 1 || CANCELED === TOTAL ? `uploads` : 'upload',
          'canceled',
        ].join(' ')
      : undefined;

    const failedMessage = hasFailure
      ? [
          FAILED === TOTAL ? 'All' : String(FAILED),
          FAILED > 1 || FAILED === TOTAL ? `files` : 'file',
          'failed to upload',
        ].join(' ')
      : undefined;

    const completedMessage = hasSuccess
      ? [
          COMPLETE === TOTAL ? 'All' : String(COMPLETE),
          COMPLETE > 1 || COMPLETE === TOTAL ? `files` : 'file',
          'uploaded',
        ].join(' ')
      : undefined;

    const messages = [
      preventedOverwriteMessage,
      failedMessage,
      canceledMessage,
      completedMessage,
    ].filter(Boolean);

    if (messages.length > 0) {
      return {
        content: messages.join(', ') + '.',
        type,
      };
    }

    return { content: 'All files uploaded.', type };
  },
  getFilesValidationMessage: (data) => {
    if (!data?.invalidFiles) {
      return undefined;
    }
    const tooBigFileNames = data.invalidFiles
      .filter(({ file }) => isFileTooBig(file))
      .map(({ file }) => file.name)
      .join(', ');
    if (tooBigFileNames) {
      return {
        content: `Files larger than 160GB cannot be added to the upload queue: ${tooBigFileNames}`,
        type: 'warning',
      };
    }
    return undefined;
  },
  overwriteToggleLabel: 'Overwrite existing files',
  statusDisplayOverwritePreventedLabel: 'Overwrite prevented',
  tableColumnProgressHeader: 'Progress',
  title: 'Upload',
};
