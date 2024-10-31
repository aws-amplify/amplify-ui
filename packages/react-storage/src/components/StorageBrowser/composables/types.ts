import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { DataRefreshProps } from './DataRefresh';
import { ActionStartProps } from './ActionStart';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
