import React from 'react';
import { LocationData, LocationItemData } from '../../actions';
import { isFunction } from '@aws-amplify/ui';

type ListItemType = LocationItemData | LocationData;

interface UsePaginate<T extends ListItemType> {
  currentPage: number;
  highestPageVisited: number;
  onPaginate: (page: number) => void;
  handleReset: () => void;
  pageItems: T[];
}

interface UsePaginateProps<T extends ListItemType> {
  hasNextToken: boolean;
  items: T[];
  paginateCallback?: () => void;
  pageSize: number;
  resultCount: number;
}

export const usePaginate = <T extends ListItemType>({
  hasNextToken,
  items,
  paginateCallback,
  pageSize,
  resultCount,
}: UsePaginateProps<T>): UsePaginate<T> => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const handleReset = React.useRef(() => {
    setCurrentPage(1);
  }).current;

  return React.useMemo((): UsePaginate<T> => {
    const highestPageVisited = Math.ceil(resultCount / pageSize);
    const isFirstPage = currentPage === 1;
    const start = isFirstPage ? 0 : (currentPage - 1) * pageSize;
    const end = isFirstPage ? pageSize : currentPage * pageSize;
    const pageItems = Array.isArray(items) ? items.slice(start, end) : [];

    return {
      currentPage,
      onPaginate: (page) => {
        const shouldPaginate =
          page >= 1 && (page <= highestPageVisited || hasNextToken);
        if (shouldPaginate) {
          if (isFunction(paginateCallback)) paginateCallback();
          setCurrentPage(page);
        } else {
          // eslint-disable-next-line no-console
          console.warn('Page is out of bounds');
          setCurrentPage(1);
        }
      },
      handleReset,
      highestPageVisited,
      pageItems,
    };
  }, [
    currentPage,
    handleReset,
    hasNextToken,
    items,
    paginateCallback,
    pageSize,
    resultCount,
  ]);
};
