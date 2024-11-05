import { Composables } from '../composables/types';
import { DataTableSortHeader, DataTableProps } from '../composables/DataTable';
import { DropZoneProps } from '../composables/DropZone';
import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';
import { LocationData } from '../actions';

export interface ControlProps {
  className?: string;
}

export interface Controls {
  props: React.ComponentProps<Composables[keyof Composables]>;
}

export type ControlKey = keyof Composables;

export type TaskCounts = typeof INITIAL_STATUS_COUNTS;

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

interface Location {
  current?: LocationData;
  path?: string;
}

export interface ControlsContext {
  data: {
    actionStartLabel?: string;
    isActionStartDisabled?: boolean;
    actionCancelLabel?: string;
    isActionCancelDisabled?: boolean;
    isDataRefreshDisabled?: boolean;
    showIncludeSubfolders?: boolean;
    searchPlaceholder?: string;
    location?: Location;
    tableData?: TableData;
    taskCounts?: TaskCounts;
  };
  actionsConfig?: {
    type:
      | 'SINGLE_ACTION'
      | 'BATCH_ACTION'
      | 'LIST_LOCATIONS'
      | 'LIST_LOCATION_ITEMS';
    isCancelable?: boolean;
  };
  onActionStart?: () => void;
  onActionCancel?: () => void;
  onDropComplete?: DropZoneProps['onDropComplete'];
  onNavigate?: (location: LocationData, path?: string) => void;
  onNavigateHome?: () => void;
  onRefresh?: () => void;
  onSearch?: (term: string, includeSubfolders: boolean) => void;
}
