import {
  FileData,
  FileDataItem,
  LocationData,
  LocationItemData,
} from '../../actions';
import { ActionsListItem } from '../../composables/ActionsList';
import { LocationState } from '../../providers/store/location';

import { ListViewProps } from '../types';

export interface LocationDetailViewState {
  actions: ActionsListItem[];
  hasError: boolean;
  hasNextPage: boolean;
  hasDownloadError: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  isSearchingSubfolders: boolean;
  location: LocationState;
  areAllFilesSelected: boolean;
  fileDataItems: FileDataItem[] | undefined;
  hasFiles: boolean;
  message: string | undefined;
  downloadErrorMessage: string | undefined;
  shouldShowEmptyMessage: boolean;
  searchQuery: string;
  hasExhaustedSearch: boolean;
  pageItems: LocationItemData[];
  page: number;
  onActionSelect: (actionType: string) => void;
  onDropFiles: (files: File[]) => void;
  onRefresh: () => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onNavigateHome: () => void;
  onPaginate: (page: number) => void;
  onDownload: (fileItem: FileDataItem) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onSelectAll: () => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onSearchQueryChange: (value: string) => void;
  onToggleSearchSubfolders: () => void;
}

export interface LocationDetailViewProps extends ListViewProps {
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
}

export interface LocationDetailViewProviderProps
  extends LocationDetailViewState {
  children?: React.ReactNode;
}

export interface LocationDetailViewInterface {
  (
    props: {
      children?: React.ReactNode;
      className?: string;
    } & LocationDetailViewProps
  ): React.JSX.Element | null;
  displayName: string;
  Provider: (props: LocationDetailViewProviderProps) => React.JSX.Element;
  ActionsList: () => React.JSX.Element | null;
  DropZone: (props: { children: React.ReactNode }) => React.JSX.Element | null;
  LoadingIndicator: () => React.JSX.Element | null;
  LocationItemsTable: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Navigation: () => React.JSX.Element | null;
  Pagination: () => React.JSX.Element | null;
  Refresh: () => React.JSX.Element | null;
  Search: () => React.JSX.Element | null;
  SearchSubfoldersToggle: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

interface InitialValues {
  pageSize?: number;
  delimiter?: string;
}

export interface UseLocationDetailViewOptions {
  initialValues?: InitialValues;
  onActionSelect?: (actionType: string) => void;
  onExit?: () => void;
  onNavigate?: (location: LocationData, path?: string) => void;
}
