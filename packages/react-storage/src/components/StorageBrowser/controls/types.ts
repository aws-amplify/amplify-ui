import { ComposableTypes } from '../composables/types';
import { DataTableSortHeader, DataTableProps } from '../composables/DataTable';
import { INITIAL_STATUS_COUNTS } from '../views/LocationActionView/constants';

export interface ControlProps {
  className?: string;
}

export interface Controls {
  props: React.ComponentProps<ComposableTypes[keyof ComposableTypes]>;
}

export type ControlKey = keyof ComposableTypes;

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
  isLoading?: boolean;
}

interface PaginationData {
  currentPage: number;
  disableNext: boolean;
  disablePrevious: boolean;
  handlePaginateNext: () => void;
  handlePaginatePrevious: () => void;
}

export interface ControlsContext {
  data: {
    taskCounts?: TaskCounts;
    tableData?: TableData;
    pagination?: PaginationData;
  };
  actionsConfig: {
    type:
      | 'SINGLE_ACTION'
      | 'BATCH_ACTION'
      | 'LIST_LOCATIONS'
      | 'LIST_LOCATION_ITEMS';
    isCancelable?: boolean;
  };
}
