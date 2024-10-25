import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { DataRefreshProps } from './DataRefresh';
export interface Composables {
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
