import {
  DefaultActionViewDisplayText,
  DefaultListViewDisplayText,
} from '../../types';

// export const TASK_STATUS_DISPLAY_LABELS = {
//   CANCELED: 'Canceled',
//   COMPLETE: 'Completed',
//   FAILED: 'Failed',
//   OVERWRITE_PREVENTED: 'Overwrite Prevented',
//   INITIAL: 'Not Started',
//   PENDING: 'In Progress',
//   QUEUED: 'Queued',
// };

export const DEFAULT_ACTION_VIEW_DISPLAY_TEXT: Omit<
  DefaultActionViewDisplayText,
  'actionStartLabel' | 'getActionCompleteMessage' | 'title'
> = {
  actionCancelLabel: 'Cancel',
  actionExitLabel: 'Exit',
  actionDestinationLabel: 'Destination',
  // status display
  statusDisplayCanceledLabel: 'Canceled',
  statusDisplayCompletedLabel: 'Completed',
  statusDisplayFailedLabel: 'Failed',
  statusDisplayTotalLabel: 'Total',
  statusDisplayQueuedLabel: 'Not started',
  // table task display
  tableStatusDisplayCanceledLabel: 'Canceled',
  tableStatusDisplayCompletedLabel: 'Completed',
  tableStatusDisplayFailedLabel: 'Failed',
  tableStatusDisplayOverwritePreventedLabel: 'Overwrite prevented',
  tableStatusDisplayInProgressLabel: 'In progress',
  tableStatusDisplayQueuedLabel: 'In queue',
  tableStatusDisplayInitialLabel: 'Not started',
  // empty by default
  tableColumnCancelHeader: '',
  tableColumnStatusHeader: 'Status',
  tableColumnFolderHeader: 'Folder',
  tableColumnNameHeader: 'Name',
  tableColumnTypeHeader: 'Type',
  tableColumnSizeHeader: 'Size',
  tableColumnProgressHeader: 'Progress',
};

export const DEFAULT_LIST_VIEW_DISPLAY_TEXT: Omit<
  DefaultListViewDisplayText,
  'getListResultsMessage' | 'searchPlaceholder'
> = {
  loadingIndicatorLabel: 'Loading',
  searchSubmitLabel: 'Search',
};
