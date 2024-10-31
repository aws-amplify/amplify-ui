import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { StatusDisplayProps } from './StatusDisplay';
import { TitleProps } from './Title';
import { DataRefreshProps } from './DataRefresh';
import { ActionStartProps } from './ActionStart';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
  Title: React.ComponentType<TitleProps>;  
}

export interface ComposablesContext {
  composables?: Composables;
}
