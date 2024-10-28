import React from 'react';

import { LocationData, LocationItem } from '../../context/types';
import { useControl } from '../../context/control';
import { useAction } from '../../context/actions';
import { isString } from '@aws-amplify/ui';
import { usePaginate } from '../hooks/usePaginate';
import { isFile } from '../utils';
import { InitialSearchValues, useSearch } from '../hooks/useSearch';

interface UseLocationDetailView {
  hasNextPage: boolean;
  hasError: boolean;
  isLoading: boolean;
  message: string | undefined;
  pageItems: LocationItem[];
  page: number;
  onAccessItem: (key: string) => void;
  onRefresh: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
  onAddFiles: (files: File[]) => void;
  onSearch: (term: string, includeSubfolders?: boolean) => void;
}

export type LocationDetailViewActionType =
  | { type: 'REFRESH_DATA' } // refresh data only
  | { type: 'RESET' } // reset view to initial state
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'ACCESS_ITEM'; key: string }
  | { type: 'NAVIGATE'; location: LocationData }
  | { type: 'ADD_FILES'; files: File[] }
  | { type: 'SEARCH'; query: string; includeSubfolders?: boolean };

interface InitialValues {
  pageSize?: number;
  delimiter?: string;
}

export interface UseLocationDetailViewOptions {
  initialValues?: InitialValues;
  onDispatch?: React.Dispatch<LocationDetailViewActionType>;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
};

const INITIAL_SEARCH_VALUES: InitialSearchValues<LocationItem> = {
  searchKey: 'key',
  searchTerm: '',
};

export function useLocationDetailView(
  options?: UseLocationDetailViewOptions
): UseLocationDetailView {
  const initialValues = options?.initialValues;
  const listOptions = React.useMemo(() => {
    return {
      ...DEFAULT_LIST_OPTIONS,
      ...initialValues,
    };
  }, [initialValues]);

  const [state, handleUpdateState] = useControl('NAVIGATE');
  const { path, history } = state;

  const [{ data, isLoading, hasError, message }, handleList] = useAction(
    'LIST_LOCATION_ITEMS'
  );
  const [, handleLocationActionsState] = useControl('LOCATION_ACTIONS');

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const hasValidPath = isString(path);
  const onPaginateNext = () => {
    if (!hasValidPath) return;

    handleLocationActionsState({ type: 'CLEAR' });
    handleList({
      prefix: path,
      options: { ...listOptions, nextToken },
    });
  };

  const onPaginatePrevious = () => {
    handleLocationActionsState({ type: 'CLEAR' });
  };

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
    range,
  } = usePaginate({
    onPaginateNext,
    onPaginatePrevious,
    pageSize: listOptions.pageSize,
  });

  const { filteredItems, handleSearch } = useSearch<LocationItem>({
    items: result,
    initialValues: INITIAL_SEARCH_VALUES,
    onSearch: (term: string, includeSubfolders?: boolean) => {
      if (!hasValidPath) return;
      if (includeSubfolders) {
        handleList({
          prefix: path,
          options: {
            ...listOptions,
            delimiter: undefined,
            prefetch: { maxResults: 100000 },
          },
        });
      }
    },
  });

  const onRefresh = () => {
    if (!hasValidPath) return;

    handleReset();
    handleList({
      prefix: path,
      options: { ...listOptions, refresh: true },
    });
    handleLocationActionsState({ type: 'CLEAR' });
  };

  React.useEffect(() => {
    if (!hasValidPath) return;

    handleReset();
    handleList({
      prefix: path,
      options: { ...listOptions, refresh: true },
    });
  }, [path, handleList, handleReset, hasValidPath, listOptions]);

  const processedItems = React.useMemo(() => {
    const [start, end] = range;
    return filteredItems.slice(start, end);
  }, [range, filteredItems]);

  return {
    page: currentPage,
    pageItems: processedItems,
    hasNextPage: hasNextToken,
    hasError,
    message,
    isLoading,
    onPaginatePrevious: () => {
      if (!hasValidPath) return;
      handlePaginatePrevious();
    },
    onPaginateNext: () => {
      if (!hasValidPath) return;
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onRefresh,
    onAccessItem: (key: string) => {
      const currentPosition = history.length;
      handleUpdateState({
        type: 'NAVIGATE',
        entry: {
          position: currentPosition + 1,
          prefix: key,
        },
      });
    },
    onAddFiles: (files: File[]) => {
      if (isFile(files[0])) {
        handleLocationActionsState({
          type: 'SET_ACTION',
          actionType: 'UPLOAD_FILES',
          files,
        });
      } else {
        handleLocationActionsState({
          type: 'SET_ACTION',
          actionType: 'UPLOAD_FOLDER',
          files,
        });
      }
    },
    onSearch: handleSearch,
  };
}
