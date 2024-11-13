import { StatusCounts } from '../tasks';
import { LocationData, LocationItemData } from '../actions';
import { Permission } from '../storage-internal';
import { LocationState } from '../providers/store/location';

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
  getListResultsMessage: (data: T, error?: Error) => string;
  loadingIndicatorLabel: string;
  searchPlaceholder: string;
  searchSubmitLabel: string;
}

export interface DefaultLocationsViewDisplayText
  extends DefaultListViewDisplayText<LocationData> {
  getPermissionName: (permission: Permission) => string;
  title: string;
  tableColumnFolderHeader: string;
  tableColumnBucketHeader: string;
  tableColumnPermissionsHeader: string;
  tableColumnActionsHeader: string;
  getDownloadLabel: (fileName: string) => string;
}

export interface DefaultLocationDetailViewDisplayText
  extends DefaultListViewDisplayText<LocationItemData> {
  title: (location: LocationState) => string;
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
  // `CreateFolderView` does not include that table or status display components
  extends Omit<
    DefaultActionViewDisplayText,
    `${'tableColumn' | 'statusDisplay'}${string}`
  > {
  folderNameLabel: string;
  folderNamePlaceholder: string;
  getValidationMessage: (folderName: string) => string;
}

export interface DefaultCopyViewDisplayText
  extends DefaultActionViewDisplayText {
  actionSetDestination: string;
  getFolderListResultsMessage: (data: {
    items: LocationItemData[];
    query?: string;
    errorMessage?: string;
  }) => string | undefined;
  getFolderSelectedMessage: (path: string) => string;
  loadingIndicatorLabel: 'Loading';
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
