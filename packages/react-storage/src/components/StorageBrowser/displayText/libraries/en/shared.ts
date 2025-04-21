import type {
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
  statusDisplayInProgressLabel: 'In progress',
  statusDisplayTotalLabel: 'Total',
  statusDisplayQueuedLabel: 'Not started',
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
  searchSubmitLabel: 'Submit',
  searchClearLabel: 'Clear search',
  getDateDisplayValue: (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      year: 'numeric',
      minute: 'numeric',
      hourCycle: 'h12',
    }).format(date),
};
