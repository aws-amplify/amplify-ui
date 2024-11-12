import { ActionCancelProps } from './ActionCancel';
import { ActionStartProps } from './ActionStart';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { LoadingIndicatorProps } from './LoadingIndicator';
import { MessageProps } from './Message';
import { FolderNameFieldProps } from './FolderNameField';
import { NavigationProps } from './Navigation';
import { StatusDisplayProps } from './StatusDisplay';
import { PaginationProps } from './Pagination';
import { SearchProps } from './Search';
import { TitleProps } from './Title';

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
  Pagination: React.ComponentType<PaginationProps>;
  Search: React.ComponentType<SearchProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Title: React.ComponentType<TitleProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
