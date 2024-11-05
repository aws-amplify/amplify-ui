import { TaskCounts } from '../controls/types';
import { LocationData, LocationItemData } from '../actions';

/**
 * Common display text values available on each action view (e.g. upload, copy, etc)
 */
export interface DefaultActionViewDisplayText {
  actionCancelLabel: string;
  actionDestinationLabel: string;
  actionExitLabel: string;
  actionStartLabel: string;
  getActionCompleteMessage: (counts: TaskCounts) => string;
  statusDisplayCanceledLabel: string;
  statusDisplayCompletedLabel: string;
  statusDisplayFailedLabel: string;
  statusDisplayQueuedLabel: string;
  statusDisplayTotalLabel: string;
  title: string;
  tableColumnCancelHeader: string;
  tableColumnStatusHeader: string;
  tableColumnFolderHeader: string;
  tableColumnNameHeader: string;
  tableColumnTypeHeader: string;
  tableColumnSizeHeader: string;
}

/**
 * Common list view display text values
 */
export interface DefaultListViewDisplayText<T = any> {
  searchPlaceholder: string;
  searchSubmitLabel: string;
  getListResultsMessage: (data: T, error?: Error) => string;
}

export interface DefaultLocationsViewDisplayText
  extends DefaultListViewDisplayText<LocationData> {
  tableColumnFolderHeader: string;
  tableColumnBucketHeader: string;
  tableColumnPermissionsHeader: string;
}

export interface DefaultLocationDetailViewDisplayText
  extends DefaultListViewDisplayText<LocationItemData> {
  title: string | ((location: LocationData) => string);
  searchExhaustedMessage: string;
  searchIncludeSubfoldersLabel: string;
  tableColumnLastModifiedHeader: string;
  tableColumnNameHeader: string;
  tableColumnSizeHeader: string;
  tableColumnTypeHeader: string;
}

export interface DefaultUploadViewDisplayText
  extends DefaultActionViewDisplayText {
  addFilesLabel: string;
  addFolderLabel: string;
  statusDisplayOverridePreventedLabel: string;
  overwriteExistingLabel: string;
}

export interface DefaultStorageBrowserDisplayText {
  LocationsView: DefaultLocationsViewDisplayText;
  LocationDetailView: DefaultLocationDetailViewDisplayText;
  UploadView: DefaultUploadViewDisplayText;
  // CopyView
  // DeleteView
  // CreateFolderView
}

interface LocationsViewDisplayText
  extends Partial<DefaultLocationsViewDisplayText> {}
interface LocationDetailViewDisplayText
  extends Partial<DefaultLocationDetailViewDisplayText> {}
interface UploadViewDisplayText extends Partial<DefaultUploadViewDisplayText> {}

export interface StorageBrowserDisplayText {
  LocationsView?: LocationsViewDisplayText;
  LocationDetailView?: LocationDetailViewDisplayText;
  UploadView?: UploadViewDisplayText;
  // CopyView
  // DeleteView
  // CreateFolderView
}
