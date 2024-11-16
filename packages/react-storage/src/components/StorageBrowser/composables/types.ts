import { ActionCancelProps } from './ActionCancel';
import { ActionExitProps } from './ActionExit';
import { ActionStartProps } from './ActionStart';
import { ActionsListProps } from './ActionsList';
import { AddFilesProps } from './AddFiles';
import { AddFolderProps } from './AddFolder';
import { DataRefreshProps } from './DataRefresh';
import { DataTableProps } from './DataTable';
import { DropZoneProps } from './DropZone';
import { LoadingIndicatorProps } from './LoadingIndicator';
import { MessageProps } from './Message';
import { FolderNameFieldProps } from './FolderNameField';
import { NavigationProps } from './Navigation';
import { OverwriteToggleProps } from './OverwriteToggle';
import { StatusDisplayProps } from './StatusDisplay';
import { PaginationProps } from './Pagination';
import { SearchFieldProps } from './SearchField';
import { SearchSubfoldersToggleProps } from './SearchSubfoldersToggle';
import { TitleProps } from './Title';

export interface Composables {
  ActionCancel: React.ComponentType<ActionCancelProps>;
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
