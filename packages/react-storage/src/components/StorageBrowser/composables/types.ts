import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { DataRefreshProps } from './DataRefresh';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
