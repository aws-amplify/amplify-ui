import type { ActionCancelProps } from './ActionCancel';
import type { ActionDestinationProps } from './ActionDestination';
import type { ActionExitProps } from './ActionExit';
import type { ActionStartProps } from './ActionStart';
import type { ActionsListProps } from './ActionsList';
import type { AddFilesProps } from './AddFiles';
import type { AddFolderProps } from './AddFolder';
import type { DataRefreshProps } from './DataRefresh';
import type { DataTableProps } from './DataTable';
import type { DropZoneProps } from './DropZone';
import type { LoadingIndicatorProps } from './LoadingIndicator';
import type { MessageProps } from './Message';
import type { FolderNameFieldProps } from './FolderNameField';
import type { NavigationProps } from './Navigation';
import type { OverwriteToggleProps } from './OverwriteToggle';
import type { StatusDisplayProps } from './StatusDisplay';
import type { PaginationProps } from './Pagination';
import type { SearchFieldProps } from './SearchField';
import type { SearchSubfoldersToggleProps } from './SearchSubfoldersToggle';
import type { TitleProps } from './Title';

export interface Composables {
  ActionCancel: React.ComponentType<ActionCancelProps>;
  ActionDestination: React.ComponentType<ActionDestinationProps>;
  ActionExit: React.ComponentType<ActionExitProps>;
  ActionStart: React.ComponentType<ActionStartProps>;
  ActionsList: React.ComponentType<ActionsListProps>;
  AddFiles: React.ComponentType<AddFilesProps>;
  AddFolder: React.ComponentType<AddFolderProps>;
  DataRefresh: React.ComponentType<DataRefreshProps>;
  DataTable: React.ComponentType<DataTableProps>;
  DropZone: React.ComponentType<DropZoneProps>;
  FolderNameField: React.ComponentType<FolderNameFieldProps>;
  LoadingIndicator: React.ComponentType<LoadingIndicatorProps>;
  Message: React.ComponentType<MessageProps>;
  Navigation: React.ComponentType<NavigationProps>;
  OverwriteToggle: React.ComponentType<OverwriteToggleProps>;
  Pagination: React.ComponentType<PaginationProps>;
  SearchField: React.ComponentType<SearchFieldProps>;
  SearchSubfoldersToggle: React.ComponentType<SearchSubfoldersToggleProps>;
  StatusDisplay: React.ComponentType<StatusDisplayProps>;
  Title: React.ComponentType<TitleProps>;
}

export interface ComposablesContext {
  composables?: Composables;
}
