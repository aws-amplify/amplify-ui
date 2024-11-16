import React from 'react';

import { usePaginate } from '../hooks/usePaginate';
import {
  createFileDataItemFromLocation,
  downloadHandler,
  ListLocationsExcludeOptions,
  LocationData,
  useListLocations,
} from '../../actions';
import { useStore } from '../../providers/store';
import { useSearch } from '../hooks/useSearch';
import { useGetActionInput } from '../../providers/configuration';
import { useProcessTasks } from '../../tasks';

interface UseLocationsView {
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

interface InitialValues {
  pageSize?: number;
}

export interface UseLocationsViewOptions {
  initialValues?: InitialValues;
  onNavigate?: (location: LocationData) => void;
}

const DEFAULT_EXCLUDE: ListLocationsExcludeOptions = {
  exactPermissions: ['delete', 'write'],
};
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  exclude: DEFAULT_EXCLUDE,
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationsView(
  options?: UseLocationsViewOptions
): UseLocationsView {
  const getConfig = useGetActionInput();

  const [state, handleList] = useListLocations();
  const { data, message, hasError, isLoading } = state;

  const [_, handleDownload] = useProcessTasks(downloadHandler);
  const [, dispatchStoreAction] = useStore();
  const [term, setTerm] = React.useState('');
  const { items, nextToken } = data;
  const hasNextToken = !!nextToken;

  const onNavigate = options?.onNavigate;
  const initialValues = options?.initialValues ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });
  const listOptions = listOptionsRef.current;

  // initial load
  React.useEffect(() => {
    handleList({
      options: { ...listOptions, refresh: true },
    });
  }, [handleList, listOptions]);

  // set up pagination
  const paginateCallback = () => {
    if (!nextToken) return;
    handleList({
      options: { ...listOptions, nextToken },
    });
  };

  const onSearch = (query: string) => {
    setTerm(query);
  };

  const { searchQuery, onSearchQueryChange, onSearchSubmit, resetSearch } =
    useSearch({ onSearch });

  const {
    currentPage,
    onPaginate,
    handleReset,
    highestPageVisited,
    pageItems,
  } = usePaginate({
    items,
    paginateCallback,
    pageSize: listOptions.pageSize,
    hasNextToken,
  });

  const filteredItems = React.useMemo(() => {
    return pageItems.filter(
      ({ prefix, bucket }) => prefix.includes(term) || bucket.includes(term)
    );
  }, [pageItems, term]);

  const shouldShowEmptyMessage =
    pageItems.length === 0 && !isLoading && !hasError;

  return {
    isLoading,
    hasError,
    message,
    page: currentPage,
    hasNextPage: hasNextToken,
    highestPageVisited,
    pageItems: filteredItems,
    shouldShowEmptyMessage,
    searchQuery,
    onDownload: (location: LocationData) => {
      handleDownload({
        config: getConfig(location),
        data: createFileDataItemFromLocation(location),
      });
    },
    onNavigate: (location: LocationData) => {
      onNavigate?.(location);
      dispatchStoreAction({ type: 'NAVIGATE', location });
    },
    onRefresh: () => {
      resetSearch();
      setTerm('');
      handleReset();
      handleList({
        options: { ...listOptions, refresh: true },
      });
    },
    onPaginate,
    onSearch: onSearchSubmit,
    onSearchQueryChange,
    onSearchClear: () => {
      setTerm('');
      resetSearch();
    },
  };
}
