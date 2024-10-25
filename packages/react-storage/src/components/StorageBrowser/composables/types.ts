import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { TitleProps } from './Title';

export interface Composables {
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Title: React.ComponentType<TitleProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
