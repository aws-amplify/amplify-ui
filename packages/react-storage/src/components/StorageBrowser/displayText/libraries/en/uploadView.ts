import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultUploadViewDisplayText } from '../../types';
import { isFileTooBig } from '../../../validators';

function getMessage(
  count: number,
  total: number | undefined,
  result?: string
): string {
  const quantity = count === total ? 'All' : String(count);
  const pluralize = count > 1 || count === total ? 'files' : 'file';

  return `${quantity} ${pluralize}${result ? ` ${result}` : ''}`;
}

export const DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT: DefaultUploadViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Upload',
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
      ? `Overwrite prevented for ${getMessage(
          OVERWRITE_PREVENTED,
          TOTAL
        ).toLocaleLowerCase()}`
      : undefined;

    const canceledMessage = hasCanceled
      ? getMessage(CANCELED, TOTAL, 'canceled')
      : undefined;

    const failedMessage = hasFailure
      ? getMessage(FAILED, TOTAL, 'failed to upload')
      : undefined;

    const completedMessage = hasSuccess
      ? getMessage(COMPLETE, TOTAL, 'uploaded')
      : undefined;

    const messages = [
      preventedOverwriteMessage,
      canceledMessage,
      failedMessage,
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
  statusDisplayOverwritePreventedLabel: 'Overwrite prevented',
  overwriteToggleLabel: 'Overwrite existing files',
};
