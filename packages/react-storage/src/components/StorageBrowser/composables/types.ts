import { ActionCancelProps } from './ActionCancel';
import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
// import { FolderNameFieldProps } from './FolderNameField';
import { NavigationProps } from './Navigation';
import { StatusDisplayProps } from './StatusDisplay';
import { SearchProps } from './Search';

export interface Composables {
  ActionStart: React.ComponentType<ActionStartProps>;
  ActionCancel: React.ComponentType<ActionCancelProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  // uncomment when intergrated in CreateFolderView
  // FolderNameField: React.ComponentType<FolderNameFieldProps>;
  Navigation: React.ComponentType<NavigationProps>;
  Search: React.ComponentType<SearchProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
