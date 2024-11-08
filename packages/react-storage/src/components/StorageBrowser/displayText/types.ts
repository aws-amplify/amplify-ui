import { StatusCounts } from '../tasks';
import { LocationData, LocationItemData } from '../actions';

/**
 * Common display text values available on each action view (e.g. upload, copy, etc)
 */
export interface DefaultActionViewDisplayText {
  actionCancelLabel: string;
  actionDestinationLabel: string;
  actionExitLabel: string;
  actionStartLabel: string;
  getActionCompleteMessage: (counts: StatusCounts) => string;
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
  title: string;
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

/**
 * Action view display text values
 */

export interface DefaultCreateFolderViewDisplayText
  extends DefaultActionViewDisplayText {
  getValidationMessage: (folderName: string) => string;
}

export interface DefaultCopyViewDisplayText
  extends DefaultActionViewDisplayText {
  getFolderSelectedMessage: (path: string) => string;
  overwriteWarningMessage: string;
  searchPlaceholder: string;
}

export interface DefaultDeleteViewDisplayText
  extends DefaultActionViewDisplayText {}

export interface DefaultUploadViewDisplayText
  extends DefaultActionViewDisplayText {
  addFilesLabel: string;
  addFolderLabel: string;
  statusDisplayOverridePreventedLabel: string;
  overwriteExistingLabel: string;
}

export interface DefaultStorageBrowserDisplayText {
  CopyView: DefaultCopyViewDisplayText;
  CreateFolderView: DefaultCreateFolderViewDisplayText;
  DeleteView: DefaultDeleteViewDisplayText;
  LocationsView: DefaultLocationsViewDisplayText;
  LocationDetailView: DefaultLocationDetailViewDisplayText;
  UploadView: DefaultUploadViewDisplayText;
}

interface CreateFolderViewDisplayText
  extends Partial<DefaultCreateFolderViewDisplayText> {}
interface CopyViewDisplayText extends Partial<DefaultCopyViewDisplayText> {}
interface DeleteViewDisplayText extends Partial<DefaultDeleteViewDisplayText> {}
interface LocationsViewDisplayText
  extends Partial<DefaultLocationsViewDisplayText> {}
interface LocationDetailViewDisplayText
  extends Partial<DefaultLocationDetailViewDisplayText> {}
interface UploadViewDisplayText extends Partial<DefaultUploadViewDisplayText> {}

export interface StorageBrowserDisplayText {
  LocationsView?: LocationsViewDisplayText;
  LocationDetailView?: LocationDetailViewDisplayText;
  UploadView?: UploadViewDisplayText;
  DeleteView?: DeleteViewDisplayText;
  CopyView?: CopyViewDisplayText;
  CreateFolderView?: CreateFolderViewDisplayText;
}
