import { LocationData } from '../actions';
import { ActionsListItem } from '../composables/ActionsList';
import { DataTableSortHeader, DataTableProps } from '../composables/DataTable';
import { MessageType } from '../composables/Message';
import { Composables } from '../composables/types';
import { LocationState } from '../providers/store/location';
import { StatusCounts } from '../tasks';

export interface ControlProps {
  className?: string;
}

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
  onPaginate: (page: number) => void;
  page: number;
}

export interface ControlsContext {
  data: {
    actions?: ActionsListItem[];
    actionCancelLabel?: string;
    actionExitLabel?: string;
    actionStartLabel?: string;
    addFilesLabel?: string;
    addFolderLabel?: string;
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
    isOverwritingEnabled?: boolean;
    isDataRefreshDisabled?: boolean;
    isLoading?: boolean;
    isFolderNameDisabled?: boolean;
    isOverwriteToggleDisabled?: boolean;
    isSearchingSubfolders?: boolean;
    loadingIndicatorLabel?: string;
    location?: LocationState;
    overwriteToggleLabel?: string;
    messageContent?: React.ReactNode;
    messageType?: MessageType;
    paginationData?: PaginationData;
    searchPlaceholder?: string;
    searchQuery?: string;
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
  onMessageDismiss?: () => void;
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onRefresh?: () => void;
  onSearch?: () => void;
  onSearchClear?: () => void;
  onSearchQueryChange?: (value: string) => void;
  onToggleOverwrite?: () => void;
  onToggleSearchSubfolders?: () => void;
  onValidateFolderName?: (value: string) => void;
}
