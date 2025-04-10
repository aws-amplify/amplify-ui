import { StorageBrowserComponents } from '@aws-amplify/ui-react-storage/browser';

type ComponentProps<K extends keyof StorageBrowserComponents> =
  React.ComponentProps<NonNullable<StorageBrowserComponents[K]>>;

export type ActionCancelProps = ComponentProps<'ActionCancel'>;
export type ActionDestinationProps = ComponentProps<'ActionDestination'>;
export type ActionExitProps = ComponentProps<'ActionExit'>;
export type ActionStartProps = ComponentProps<'ActionStart'>;
export type ActionsListProps = ComponentProps<'ActionsList'>;
export type AddFilesProps = ComponentProps<'AddFiles'>;
export type AddFolderProps = ComponentProps<'AddFolder'>;
export type DataRefreshProps = ComponentProps<'DataRefresh'>;
export type DataTableProps = ComponentProps<'DataTable'>;
export type DropZoneProps = ComponentProps<'DropZone'>;
export type FolderNameFieldProps = ComponentProps<'FolderNameField'>;
export type LoadingIndicatorProps = ComponentProps<'LoadingIndicator'>;
export type MessageProps = ComponentProps<'Message'>;
export type NavigationProps = ComponentProps<'Navigation'>;
export type OverwriteToggleProps = ComponentProps<'OverwriteToggle'>;
export type PaginationProps = ComponentProps<'Pagination'>;
export type SearchFieldProps = ComponentProps<'SearchField'>;
export type SearchSubfoldersToggleProps =
  ComponentProps<'SearchSubfoldersToggle'>;
export type StatusDisplayProps = ComponentProps<'StatusDisplay'>;
export type TitleProps = ComponentProps<'Title'>;
