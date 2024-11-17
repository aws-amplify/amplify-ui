import { LocationData } from '../../actions';
import { ListViewProps } from '../types';

export interface LocationsViewState {
  hasNextPage: boolean;
  hasError: boolean;
  highestPageVisited: number;
  isLoading: boolean;
  message: string | undefined;
  shouldShowEmptyMessage: boolean;
  pageItems: LocationData[];
  page: number;
  searchQuery: string;
  onDownload: (item: LocationData) => void;
  onNavigate: (location: LocationData) => void;
  onRefresh: () => void;
  onPaginate: (page: number) => void;
  onSearch: () => void;
  onSearchQueryChange: (value: string) => void;
  onSearchClear: () => void;
}

export interface LocationsViewProps extends ListViewProps {}

export interface LocationsViewProviderProps extends LocationsViewState {
  children?: React.ReactNode;
}

export interface LocationsViewInterface {
  (
    props: {
      children?: React.ReactNode;
      className?: string;
    } & LocationsViewProps
  ): React.JSX.Element | null;
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
