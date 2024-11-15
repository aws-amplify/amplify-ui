import { DEFAULT_ACTION_VIEW_DISPLAY_TEXT } from './shared';
import { DefaultUploadViewDisplayText } from '../../types';

export const DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT: DefaultUploadViewDisplayText = {
  ...DEFAULT_ACTION_VIEW_DISPLAY_TEXT,
  title: 'Upload',
  actionStartLabel: 'Upload',
  addFilesLabel: 'Add files',
  addFolderLabel: 'Add folder',
  getActionCompleteMessage: (_counts) => {
    // if (counts.FAILED === counts.TOTAL) {
    //   return 'All uploads failed to complete.';
    // }

    // if (counts.CANCELED === counts.TOTAL) {
    //   return 'All uploads canceled.';
    // }

    // if (counts.OVERWRITE_PREVENTED === counts.TOTAL) {
    //   return 'Overwrite prevention applied to all uploads.';
    // }

    // if (counts.TOTAL === counts.COMPLETE) {
    //   return 'All uploads completed successfully.';
    // }

    // const prefix = 'All uploads complete';

    // const succeeded = `${counts.COMPLETE} uploads successful`;
    // const overwritePrevented = `overwrite prevention applied to ${counts.OVERWRITE_PREVENTED} uploads`;
    // const _canceled = `${counts.CANCELED} uploads canceled`;
    // const _failed = `${counts.FAILED} uploads failed`;

    // // succeeded & errors
    // // succeeded & errors & cancellations
    // // succeeded & errors & cancellations & overwrite prevented
    // // succeeded & cancellations
    // // succeeded & cancellations & overwrite prevented
    // // errors & cancellations
    // // errors & cancellations & overwrite prevented
    // // succeeded & cancellations & overwrite prevented
    // // succeeded & overwrite prevented
    // if (counts.TOTAL === counts.COMPLETE + counts.OVERWRITE_PREVENTED) {
    //   return `${prefix}. ${succeeded}, ${overwritePrevented}.`;
    // }

    // const hasErrors = counts.FAILED > 0;
    // const _hasCanceledTasks = counts.CANCELED > 0;

    // if (hasErrors) {
    //   return `All uploads complete. ${counts.COMPLETE} of ${counts.TOTAL} uploads successful, ${counts.FAILED} uploads failed to complete.`;
    // }

    return '🤷';
  },
  statusDisplayOverwritePreventedLabel: 'Overwrite prevented',
  tableStatusOverwritePreventedLabel: 'Overwrite prevented',
  overwriteToggleLabel: 'Overwrite existing files',
};
