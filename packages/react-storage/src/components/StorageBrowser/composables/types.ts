import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';

export interface Composables {
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
