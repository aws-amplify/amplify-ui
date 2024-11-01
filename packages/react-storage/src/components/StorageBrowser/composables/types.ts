import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { NavigationProps } from './Navigation';
import { StatusDisplayProps } from './StatusDisplay';
import { TitleProps } from './Title';
import { DataRefreshProps } from './DataRefresh';
import { ActionStartProps } from './ActionStart';

export interface Composables {
  ActionStart: React.ComponentType<ActionStartProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  Navigation: React.ComponentType<NavigationProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
  Title: React.ComponentType<TitleProps>;  
}

export interface ComposablesContext {
  composables?: Composables;
}
