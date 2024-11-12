import { ActionCancelProps } from './ActionCancel';
import { ActionExitProps } from './ActionExit';
import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { LoadingIndicatorProps } from './LoadingIndicator';
import { MessageProps } from './Message';
import { FolderNameFieldProps } from './FolderNameField';
import { NavigationProps } from './Navigation';
import { StatusDisplayProps } from './StatusDisplay';
import { SearchProps } from './Search';
import { TitleProps } from './Title';

export interface Composables {
  ActionCancel: React.ComponentType<ActionCancelProps>;
  ActionExit: React.ComponentType<ActionExitProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  FolderNameField: React.ComponentType<FolderNameFieldProps>;
  LoadingIndicator: React.ComponentType<LoadingIndicatorProps>;
  Message: React.ComponentType<MessageProps>;
  Navigation: React.ComponentType<NavigationProps>;
  Search: React.ComponentType<SearchProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Title: React.ComponentType<TitleProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
