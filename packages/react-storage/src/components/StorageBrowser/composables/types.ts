import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { StatusDisplayProps } from './StatusDisplay';
import { DataRefreshProps } from './DataRefresh';
import { ActionStartProps } from './ActionStart';
import { ActionCancelProps } from './ActionCancel';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
  ActionCancel: React.ComponentType<ActionCancelProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
