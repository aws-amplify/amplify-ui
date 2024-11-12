import { LocationData } from '../actions';
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

export interface ControlsContext {
  data: {
    actionCancelLabel?: string;
    actionExitLabel?: string;
    actionStartLabel?: string;
    folderNameId?: string;
    folderNameLabel?: string;
    folderNamePlaceholder?: string;
    folderNameValidationMessage?: React.ReactNode;
    isActionCancelDisabled?: boolean;
    isActionStartDisabled?: boolean;
    isAddFilesDisabled?: boolean;
    isAddFolderDisabled?: boolean;
    isDataRefreshDisabled?: boolean;
    isActionExitDisabled?: boolean;
    isLoading?: boolean;
    isFolderNameDisabled?: boolean;
    isOverwriteCheckboxDisabled?: boolean;
    loadingIndicatorLabel?: string;
    location?: LocationState;
    messageContent?: React.ReactNode;
    messageType?: MessageType;
    searchPlaceholder?: string;
    searchQuery?: string;
    statusCounts?: StatusCounts;
    tableData?: TableData;
    title?: string;
  };
  onActionCancel?: () => void;
  onActionExit?: () => void;
  onActionStart?: () => void;
  onDropFiles?: (files: File[]) => void;
  onFolderNameChange?: (value: string) => void;
  onMessageDismiss?: () => void;
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onRefresh?: () => void;
  onSearch?: () => void;
  onSearchClear?: () => void;
  onSearchQueryChange?: (value: string) => void;
  onValidateFolderName?: (value: string) => void;
}
