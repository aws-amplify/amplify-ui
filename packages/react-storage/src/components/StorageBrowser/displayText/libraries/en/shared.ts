import {
  DefaultActionViewDisplayText,
  DefaultListViewDisplayText,
} from '../../types';

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
  tableStatusCanceledLabel: 'Canceled',
  tableStatusCompletedLabel: 'Completed',
  tableStatusInProgressLabel: 'In progress',
  tableStatusFailedLabel: 'Failed',
  tableStatusQueuedLabel: 'Not started',
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
