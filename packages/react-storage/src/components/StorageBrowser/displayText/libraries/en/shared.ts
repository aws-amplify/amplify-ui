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
  statusDisplayCanceledLabel: 'Canceled',
  statusDisplayCompletedLabel: 'Completed',
  statusDisplayFailedLabel: 'Failed',
  statusDisplayTotalLabel: 'Total',
  statusDisplayQueuedLabel: 'Not Started',
  // empty by default
  tableColumnCancelHeader: '',
  tableColumnStatusHeader: 'Status',
  tableColumnFolderHeader: 'Folder',
  tableColumnNameHeader: 'Name',
  tableColumnTypeHeader: 'Type',
  tableColumnSizeHeader: 'Size',
};

export const DEFAULT_LIST_VIEW_DISPLAY_TEXT: Omit<
  DefaultListViewDisplayText,
  'getListResultsMessage' | 'searchPlaceholder'
> = {
  loadingIndicatorLabel: 'Loading',
  searchSubmitLabel: 'Search',
};
