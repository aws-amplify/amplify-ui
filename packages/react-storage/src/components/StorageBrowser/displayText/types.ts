import type { StatusCounts, Task } from '../tasks';
import type {
  CopyHandlerData,
  CreateFolderHandlerData,
  DeleteHandlerData,
  DownloadHandlerData,
  FolderData,
  LocationData,
  LocationItemData,
  LocationPermissions,
  TaskData,
  UploadHandlerData,
} from '../actions';
import type { MessageType } from '../components';
import type { FileItems } from '../fileItems';
import type { LocationState } from '../store';

/**
 * Common list view display text values
 */
export interface DefaultListViewDisplayText {
  loadingIndicatorLabel: string;
  searchPlaceholder: string;
  searchSubmitLabel: string;
  searchClearLabel: string;
  getDateDisplayValue: (date: Date) => string;
}

interface ListMessageData {
  hasError?: boolean;
  message?: string;
  hasExhaustedSearch?: boolean;
  query?: string;
  isLoading?: boolean;
}

interface ListLocationsMessageData extends ListMessageData {
  items: LocationData[] | undefined;
}

export interface DefaultLocationsViewDisplayText
  extends DefaultListViewDisplayText {
  getListLocationsResultMessage: (
    data?: ListLocationsMessageData
  ) => { content?: string; type?: MessageType } | undefined;
  getDownloadLabel: (fileName: string) => string;
  getPermissionName: (permissions: LocationPermissions) => string;
  tableColumnActionsHeader: string;
  tableColumnBucketHeader: string;
  tableColumnFolderHeader: string;
  tableColumnPermissionsHeader: string;
  title: string;
}

interface ListItemsMessageData extends ListMessageData {
  items: LocationItemData[] | undefined;
}

export interface DefaultFilePreviewDisplayText {
  closeButtonLabel: string;
  filePreviewTitle: string;
  fileInformationTitle: string;
  errorMessage: string;
  sizeLimitMessage: string;
  unsupportedFileMessage: string;
  keyLabel: string;
  sizeLabel: string;
  versionIdLabel: string;
  lastModifiedLabel: string;
  entityTagLabel: string;
  typeLabel: string;
  unknownValue: string;
  errorDescription: string;
  unsupportedFileDescription: string;
  imageLoadErrorDescription: string;
  videoLoadErrorDescription: string;
  textLoadErrorDescription: string;
  generalPreviewErrorDescription: string;
  fileSizeLimitDescription: string;
  filePrefix: string;
  retryButtonLabel: string;
  downloadButtonLabel: string;
  getTextErrorMessage: (error: string) => string;
  emptyFileMessage: string;
}

export interface DefaultLocationDetailViewDisplayText
  extends DefaultListViewDisplayText {
  getListItemsResultMessage: (
    data: ListItemsMessageData
  ) => { content?: string; type?: MessageType } | undefined;
  searchSubfoldersToggleLabel: string;
  selectFileLabel: string;
  selectFolderLabel: string;
  selectAllFilesLabel: string;
  tableColumnLastModifiedHeader: string;
  tableColumnNameHeader: string;
  tableColumnSizeHeader: string;
  tableColumnTypeHeader: string;
  getActionListItemLabel: (key: string | undefined) => string;
  getTitle: (location: LocationState) => string;
  filePreview: DefaultFilePreviewDisplayText;
}

/**
 * Action view display text values
 */

/**
 * Common display text values available on each action view (e.g. upload, copy, etc)
 */
export interface DefaultActionViewDisplayText<T extends TaskData = TaskData> {
  actionCancelLabel: string;
  actionDestinationLabel: string;
  actionExitLabel: string;
  actionStartLabel: string;
  getActionCompleteMessage: (data?: {
    counts?: StatusCounts;
    tasks?: Task<T>[];
  }) => { content?: string; type?: MessageType } | undefined;
  statusDisplayCanceledLabel: string;
  statusDisplayCompletedLabel: string;
  statusDisplayLoadedLabel: string;
  statusDisplayFailedLabel: string;
  statusDisplayInProgressLabel: string;
  statusDisplayFinishingLabel: string;
  statusDisplayQueuedLabel: string;
  statusDisplayTotalLabel: string;
  title: string;
  tableColumnCancelHeader: string;
  tableColumnStatusHeader: string;
  tableColumnFolderHeader: string;
  tableColumnNameHeader: string;
  tableColumnTypeHeader: string;
  tableColumnSizeHeader: string;
  tableColumnProgressHeader?: string;
}

export interface DefaultCreateFolderViewDisplayText
  // `CreateFolderView` does not include tasks table or status display components
  extends Omit<
    DefaultActionViewDisplayText<CreateFolderHandlerData>,
    `${'tableColumn' | 'statusDisplay'}${string}`
  > {
  folderNameLabel: string;
  folderNamePlaceholder: string;
  getValidationMessage: (folderName: string) => string | undefined;
}

interface ListFoldersMessageData extends ListMessageData {
  folders: FolderData[] | undefined;
}

export interface DefaultCopyViewDisplayText
  extends DefaultActionViewDisplayText<CopyHandlerData> {
  getListFoldersResultsMessage: (
    data: ListFoldersMessageData
  ) => { content?: string; type?: MessageType } | undefined;
  loadingIndicatorLabel: 'Loading';
  overwriteWarningMessage: string;
  searchPlaceholder: string;
  searchSubmitLabel: string;
  searchClearLabel: string;
  /**
   * @deprecated `CopyView` does not render a "progress" header
   */
  tableColumnProgressHeader?: string;
}

export interface DefaultDeleteViewDisplayText
  extends DefaultActionViewDisplayText<DeleteHandlerData> {
  /**
   * @deprecated `DeleteView` does not render a "progress" header
   */
  tableColumnProgressHeader?: string;
  confirmationModalTitle: string;
  confirmationModalConfirmLabel: string;
  confirmationModalCancelLabel: string;
  confirmationModalMessage: string;
}

export interface DefaultDownloadViewDisplayText
  extends DefaultActionViewDisplayText<DownloadHandlerData> {
  tableColumnProgressHeader: string;
}

export interface DefaultUploadViewDisplayText
  extends DefaultActionViewDisplayText<UploadHandlerData> {
  addFilesLabel: string;
  addFolderLabel: string;
  getFilesValidationMessage: (data?: {
    invalidFiles?: FileItems;
  }) => { content?: string; type?: MessageType } | undefined;
  overwriteToggleLabel: string;
  statusDisplayOverwritePreventedLabel: string;
  tableColumnProgressHeader: string;
}

export interface DefaultStorageBrowserDisplayText {
  CopyView: DefaultCopyViewDisplayText;
  CreateFolderView: DefaultCreateFolderViewDisplayText;
  DeleteView: DefaultDeleteViewDisplayText;
  DownloadView: DefaultDownloadViewDisplayText;
  LocationsView: DefaultLocationsViewDisplayText;
  LocationDetailView: DefaultLocationDetailViewDisplayText;
  UploadView: DefaultUploadViewDisplayText;
}

export interface CreateFolderViewDisplayText
  extends Partial<DefaultCreateFolderViewDisplayText> {}

export interface CopyViewDisplayText
  extends Partial<DefaultCopyViewDisplayText> {}

export interface DeleteViewDisplayText
  extends Partial<DefaultDeleteViewDisplayText> {}

export interface DownloadViewDisplayText
  extends Partial<DefaultDownloadViewDisplayText> {}

export interface LocationsViewDisplayText
  extends Partial<DefaultLocationsViewDisplayText> {}

export interface LocationDetailViewDisplayText
  extends Partial<Omit<DefaultLocationDetailViewDisplayText, 'filePreview'>> {
  filePreview?: Partial<DefaultFilePreviewDisplayText>;
}

export interface UploadViewDisplayText
  extends Partial<DefaultUploadViewDisplayText> {}

/**
 * `StorageBrowser` display text strings/resolver functions
 */
export interface StorageBrowserDisplayText {
  LocationsView?: LocationsViewDisplayText;
  LocationDetailView?: LocationDetailViewDisplayText;
  UploadView?: UploadViewDisplayText;
  DeleteView?: DeleteViewDisplayText;
  DownloadView?: DownloadViewDisplayText;
  CopyView?: CopyViewDisplayText;
  CreateFolderView?: CreateFolderViewDisplayText;
}
