import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';
import { usePaginate } from '../hooks/usePaginate';
import { useStore } from '../../providers/store';
import { useAction } from '../../do-not-import-from-here/actions';
import { LocationData, LocationItemData } from '../../actions';
import { FileData } from '../../actions/handlers';
import { isLastPage } from '../utils';

interface UseLocationDetailView {
  hasError: boolean;
  isLoading: boolean;
  isPaginateNextDisabled: boolean;
  isPaginatePreviousDisabled: boolean;
  currentLocation: LocationData | undefined;
  currentPath: string;
  areAllFilesSelected: boolean;
  fileDataItems: FileData[] | undefined;
  hasFiles: boolean;
  message: string | undefined;
  pageItems: LocationItemData[];
  page: number;
  onDropFiles: (files: File[]) => void;
  onRefresh: () => void;
  onNavigate: (location: LocationData, path?: string) => void;
  onNavigateHome: () => void;
  onPaginateNext: () => void;
  onPaginatePrevious: () => void;
  onDownload: (fileItem: FileData) => void;
  onSelect: (isSelected: boolean, fileItem: FileData) => void;
  onSelectAll: () => void;
}

export type LocationDetailViewActionType =
  | { type: 'REFRESH_DATA' } // refresh data only
  | { type: 'RESET' } // reset view to initial state
  | { type: 'PAGINATE_NEXT' }
  | { type: 'PAGINATE_PREVIOUS' }
  | { type: 'PAGINATE'; page: number }
  | { type: 'ACCESS_ITEM'; key: string }
  | { type: 'NAVIGATE'; location: LocationData; path: string }
  | { type: 'ADD_FILES'; files: File[] }
  | { type: 'SEARCH'; query: string; includeSubfolders?: boolean };

interface InitialValues {
  pageSize?: number;
  delimiter?: string;
}

export interface UseLocationDetailViewOptions {
  initialValues?: InitialValues;
  onDispatch?: React.Dispatch<LocationDetailViewActionType>;
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
  onNavigate?: (location: LocationData, path?: string) => void;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  delimiter: '/',
  pageSize: DEFAULT_PAGE_SIZE,
};

export function useLocationDetailView(
  options?: UseLocationDetailViewOptions
): UseLocationDetailView {
  const { initialValues, onActionSelect, onExit, onNavigate } = options ?? {};

  const listOptionsRef = React.useRef({
    ...DEFAULT_LIST_OPTIONS,
    ...initialValues,
  });

  const listOptions = listOptionsRef.current;

  const [{ location, locationItems }, dispatchStoreAction] = useStore();
  const { current: currentLocation, key, path: currentPath } = location;
  const { prefix } = currentLocation ?? {};
  const { fileDataItems } = locationItems;
  const hasInvalidPrefix = isUndefined(prefix);
  const { pageSize } = listOptions;

  const [{ data, isLoading, hasError, message }, handleList] = useAction(
    'LIST_LOCATION_ITEMS'
  );

  // set up pagination
  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const onPaginateNext = () => {
    if (hasInvalidPrefix || !nextToken) return;
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    handleList({
      prefix: key,
      options: { ...listOptions, nextToken },
    });
  };

  const onPaginatePrevious = () => {
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
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
    pageSize,
  });

  const onRefresh = () => {
    if (hasInvalidPrefix) return;
    handleReset();
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  React.useEffect(() => {
    if (hasInvalidPrefix) return;
    handleList({
      prefix: key,
      options: { ...listOptions, refresh: true },
    });
    handleReset();
  }, [handleList, handleReset, listOptions, hasInvalidPrefix, prefix, key]);

  const pageItems = React.useMemo(() => {
    const [start, end] = range;
    return result.slice(start, end);
  }, [range, result]);

  // Logic for Select All Files functionality
  const fileItems = React.useMemo(
    () => pageItems.filter((item): item is FileData => item.type === 'FILE'),
    [pageItems]
  );
  const areAllFilesSelected = fileDataItems?.length === fileItems.length;
  const isFinalPage =
    !hasNextToken && isLastPage(currentPage, resultCount, pageSize);
  const hasNoResults = pageItems.length === 0;

  return {
    page: currentPage,
    pageItems,
    currentLocation,
    currentPath,
    areAllFilesSelected,
    fileDataItems,
    hasFiles: fileItems.length > 0,
    isPaginateNextDisabled:
      isFinalPage || isLoading || hasError || hasNoResults,
    isPaginatePreviousDisabled: currentPage <= 1 || isLoading || hasNoResults,
    hasError,
    message,
    isLoading,
    onPaginatePrevious: handlePaginatePrevious,
    onPaginateNext: () => {
      handlePaginateNext({ resultCount, hasNextToken });
    },
    onRefresh,
    onNavigate: (location: LocationData, path?: string) => {
      onNavigate?.(location, path);
      dispatchStoreAction({ type: 'NAVIGATE', location, path });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onDropFiles: (files: File[]) => {
      dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
      dispatchStoreAction({
        type: 'SET_ACTION_TYPE',
        actionType: 'UPLOAD_FILES',
      });

      if (isFunction(onActionSelect)) onActionSelect('UPLOAD_FILES');
    },
    onDownload: (fileItem: FileData) => {
      // FIXME: Integrate with download handler/process tasks hook when available.
      // eslint-disable-next-line no-console
      console.error(
        `Trying to download ${fileItem.key} but download not yet integrated`
      );
    },
    onNavigateHome: () => {
      onExit?.();
      dispatchStoreAction({ type: 'RESET_LOCATION' });

      handleList({
        // @todo: prefix should not be required to refresh
        prefix: currentLocation?.prefix ?? '',
        options: { reset: true },
      });
      dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
      dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    },
    onSelect: (isSelected: boolean, fileItem: FileData) => {
      dispatchStoreAction(
        isSelected
          ? { type: 'REMOVE_LOCATION_ITEM', id: fileItem.id }
          : { type: 'SET_LOCATION_ITEMS', items: [fileItem] }
      );
    },
    onSelectAll: () => {
      dispatchStoreAction(
        areAllFilesSelected
          ? { type: 'RESET_LOCATION_ITEMS' }
          : { type: 'SET_LOCATION_ITEMS', items: fileItems }
      );
    },
  };
}
