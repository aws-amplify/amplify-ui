import type { FileData, LocationData } from '../actions';
import type {
  ActionListItem,
  Composables,
  DataTableProps,
  DataTableSortHeader,
  MessageProps,
} from '../components';
import type { ActionConfirmationModalProps } from '../components/composables/ActionConfirmationModal';
import type { LocationState } from '../store';
import type { StatusCounts } from '../tasks';
import type { FilePreviewState } from '../views/hooks/useFilePreview';

export interface Controls {
  props: React.ComponentProps<Composables[keyof Composables]>;
}

export type ControlKey = keyof Composables;

interface TruncatedSortHeader
  extends Omit<
    Extract<DataTableProps['headers'][number], DataTableSortHeader>,
    'content'
  > {
  content: Omit<DataTableSortHeader['content'], 'onSort' | 'sortDirection'>;
}

interface TableData {
  headers: (
    | Exclude<DataTableProps['headers'][number], DataTableSortHeader>
    | TruncatedSortHeader
  )[];
  rows: DataTableProps['rows'];
}

interface PaginationData {
  hasNextPage: boolean;
  highestPageVisited: number;
  page: number;
}

export interface ControlsContext {
  data: {
    actions?: ActionListItem[];
    activeFile?: FileData;
    activeFileHasNext?: boolean;
    activeFileHasPrev?: boolean;
    actionCancelLabel?: string;
    actionDestinationLabel?: string;
    actionExitLabel?: string;
    actionStartLabel?: string;
    addFilesLabel?: string;
    addFolderLabel?: string;
    destination?: LocationState;
    folderNameId?: string;
    folderNameLabel?: string;
    folderNamePlaceholder?: string;
    folderNameValidationMessage?: React.ReactNode;
    isActionCancelDisabled?: boolean;
    isActionExitDisabled?: boolean;
    isActionStartDisabled?: boolean;
    isActionsListDisabled?: boolean;
    isAddFilesDisabled?: boolean;
    isAddFolderDisabled?: boolean;
    isActionDestinationNavigable?: boolean;
    isOverwritingEnabled?: boolean;
    isDataRefreshDisabled?: boolean;
    isLoading?: boolean;
    isFolderNameDisabled?: boolean;
    isOverwriteToggleDisabled?: boolean;
    isSearchingSubfolders?: boolean;
    loadingIndicatorLabel?: string;
    location?: LocationState;
    overwriteToggleLabel?: string;
    message?: MessageProps;
    confirmationModal?: Omit<
      ActionConfirmationModalProps,
      'onConfirm' | 'onCancel'
    >;
    paginationData?: PaginationData;
    searchPlaceholder?: string;
    searchQuery?: string;
    filePreviewState?: FilePreviewState;
    searchSubfoldersToggleLabel?: string;
    searchSubmitLabel?: string;
    searchClearLabel?: string;
    statusCounts?: StatusCounts;
    statusDisplayCanceledLabel?: string;
    statusDisplayCompletedLabel?: string;
    statusDisplayFailedLabel?: string;
    statusDisplayQueuedLabel?: string;
    tableData?: TableData;
    title?: string;
  };
  onActionCancel?: () => void;
  onActionExit?: () => void;
  onActionSelect?: (id: string) => void;
  onActionStart?: () => void;
  onAddFiles?: () => void;
  onAddFolder?: () => void;
  onDropFiles?: (files: File[]) => void;
  onFolderNameChange?: (value: string) => void;
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onPaginate?: (page: number) => void;
  onRefresh?: () => void;
  onSearch?: () => void;
  onSelectActiveFile?: (file?: FileData | 'prev' | 'next') => void;
  onSearchClear?: () => void;
  onSearchQueryChange?: (value: string) => void;
  onOpenFilePreview?: (f: FileData) => void;
  onCloseFilePreview?: () => void;
  onRetryFilePreview?: () => void;
  onSelectDestination?: (location: LocationData, path?: string) => void;
  onToggleOverwrite?: () => void;
  onToggleSearchSubfolders?: () => void;
  onValidateFolderName?: (value: string) => void;
  onConfirmationModalConfirm?: () => void;
  onConfirmationModalCancel?: () => void;
}
