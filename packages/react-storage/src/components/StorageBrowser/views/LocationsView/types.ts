import type { LocationData } from '../../actions';
import type { ListViewProps } from '../types';

export interface LocationsViewState {
  hasError: boolean;
  hasExhaustedSearch: boolean;
  hasNextPage: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  onDownload: (item: LocationData) => void;
  onNavigate: (location: LocationData) => void;
  onPaginate: (page: number) => void;
  onRefresh: () => void;
  onSearch: () => void;
  onSearchClear: () => void;
  onSearchQueryChange: (value: string) => void;
  page: number;
  pageItems: LocationData[];
  searchQuery: string;
}

export interface LocationsViewProps extends ListViewProps {}

export interface LocationsViewProviderProps extends LocationsViewState {
  children?: React.ReactNode;
}

export interface LocationsViewType {
  (props: LocationsViewProps): React.JSX.Element | null;
  displayName: string;
  Provider: (props: LocationsViewProviderProps) => React.JSX.Element;
  LoadingIndicator: () => React.JSX.Element | null;
  LocationsTable: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Pagination: () => React.JSX.Element | null;
  Refresh: () => React.JSX.Element | null;
  Search: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

interface InitialValues {
  pageSize?: number;
}

export interface UseLocationsViewOptions {
  initialValues?: InitialValues;
  onNavigate?: (location: LocationData) => void;
}
