import { ActionCancelProps } from './ActionCancel';
import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { LoadingIndicatorProps } from './LoadingIndicator';
import { MessageProps } from './Message';
import { FolderNameFieldProps } from './FolderNameField';
import { NavigationProps } from './Navigation';
import { OverwriteToggleProps } from './OverwriteToggle';
import { StatusDisplayProps } from './StatusDisplay';
import { SearchProps } from './Search';

export interface Composables {
  ActionStart: React.ComponentType<ActionStartProps>;
  ActionCancel: React.ComponentType<ActionCancelProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  FolderNameField: React.ComponentType<FolderNameFieldProps>;
  LoadingIndicator: React.ComponentType<LoadingIndicatorProps>;
  Message: React.ComponentType<MessageProps>;
  Navigation: React.ComponentType<NavigationProps>;
  OverwriteToggle: React.ComponentType<OverwriteToggleProps>;
  Search: React.ComponentType<SearchProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
