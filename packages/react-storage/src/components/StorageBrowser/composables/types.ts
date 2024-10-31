import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { StatusDisplayProps } from './StatusDisplay';
import { PaginationProps } from './Pagination';
import { DataRefreshProps } from './DataRefresh';
import { ActionStartProps } from './ActionStart';

export interface Composables {
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Pagination: React.ComponentType<PaginationProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
