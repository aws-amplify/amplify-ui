import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { PaginationProps } from './Pagination';
import { DataRefreshProps } from './DataRefresh';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Pagination: React.ComponentType<PaginationProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
