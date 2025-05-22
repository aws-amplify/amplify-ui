import type {
  FileData,
  FileDataItem,
  LocationData,
  LocationItemData,
} from '../../actions';

import type { ActionListItem } from '../../components/composables/ActionsList';
import type { LocationState } from '../../store';

import type { ListViewProps } from '../types';

export interface LocationDetailViewState {
  actionItems: ActionListItem[];
  actionType: string | undefined;
  downloadErrorMessage: string | undefined;
  fileDataItems: FileDataItem[] | undefined;
  hasDownloadError: boolean;
  hasError: boolean;
  hasExhaustedSearch: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  isSearchSubfoldersEnabled: boolean;
  location: LocationState;
  message: string | undefined;
  onActionExit: () => void;
  onActionSelect: (actionType: string) => void;
  onDownload: (fileItem: FileDataItem) => void;
  onDropFiles: (files: File[]) => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onNavigateHome: () => void;
  onPaginate: (page: number) => void;
  onRefresh: () => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onSearchQueryChange: (value: string) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onToggleSearchSubfolders: () => void;
  onToggleSelectAll: () => void;
  page: number;
  pageItems: LocationItemData[];
  searchQuery: string;
}

export interface LocationDetailViewProps extends ListViewProps {
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
}

export interface LocationDetailViewProviderProps
  extends LocationDetailViewState {
  children?: React.ReactNode;
}

export interface LocationDetailViewType {
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
