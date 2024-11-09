import { Composables } from '../composables/types';
import { DataTableSortHeader, DataTableProps } from '../composables/DataTable';
import { DropZoneProps } from '../composables/DropZone';
import { LocationData } from '../actions';
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
    actionStartLabel?: string;
    currentLocation?: LocationData;
    currentPath?: string;
    folderNameId?: string;
    folderNameLabel?: string;
    folderNamePlaceholder?: string;
    folderNameValidationMessage?: React.ReactNode;
    isActionCancelDisabled?: boolean;
    isActionStartDisabled?: boolean;
    isAddFilesDisabled?: boolean;
    isAddFolderDisabled?: boolean;
    isDataRefreshDisabled?: boolean;
    isExitDisabled?: boolean;
    isFolderNameDisabled?: boolean;
    isOverwriteCheckboxDisabled?: boolean;
    searchPlaceholder?: string;
    showIncludeSubfolders?: boolean;
    statusCounts?: StatusCounts;
    tableData?: TableData;
  };
  onActionCancel?: () => void;
  onActionStart?: () => void;
  onDropComplete?: DropZoneProps['onDropComplete'];
  onDropFiles?: (files: File[]) => void;
  onFolderNameChange?: (value: string) => void;
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onRefresh?: () => void;
  onSearch?: (term: string, includeSubfolders: boolean) => void;
  onValidateFolderName?: (value: string) => void;
}
