import { DataTableProps } from './DataTable';
import { StatusDisplayProps } from './StatusDisplay';
import { TitleProps } from './Title';
import { DataRefreshProps } from './DataRefresh';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Title: React.ComponentType<TitleProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
