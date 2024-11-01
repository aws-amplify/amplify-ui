import { ActionCancelProps } from './ActionCancel';
import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { NavigationProps } from './Navigation';
import { StatusDisplayProps } from './StatusDisplay';

export interface Composables {
  ActionStart: React.ComponentType<ActionStartProps>;
  ActionCancel: React.ComponentType<ActionCancelProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  Navigation: React.ComponentType<NavigationProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
