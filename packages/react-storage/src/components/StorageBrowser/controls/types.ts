import { Composables } from '../composables/types';
import { DataTableSortHeader, DataTableProps } from '../composables/DataTable';
import { LocationData } from '../actions';
import { StatusCounts } from '../tasks';
import { LocationState } from '../providers/store/location';

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
    actionStartLabel?: string;
    actionCancelLabel?: string;
    isActionCancelDisabled?: boolean;
    isActionStartDisabled?: boolean;
    isAddFilesDisabled?: boolean;
    isAddFolderDisabled?: boolean;
    isDataRefreshDisabled?: boolean;
    isExitDisabled?: boolean;
    isOverwriteCheckboxDisabled?: boolean;
    location?: LocationState;
    showIncludeSubfolders?: boolean;
    searchPlaceholder?: string;
    tableData?: TableData;
    statusCounts?: StatusCounts;
  };
  onActionCancel?: () => void;
  onActionStart?: () => void;
  onDropFiles?: (files: File[]) => void;
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onRefresh?: () => void;
  onSearch?: (term: string, includeSubfolders: boolean) => void;
}
