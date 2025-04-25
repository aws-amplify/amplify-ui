import React from 'react';

import { isFunction } from '@aws-amplify/ui';

const DEFAULT_PAGE_SIZE = 100;

interface UsePaginateState<T> {
  handlePaginate: (page: number) => void;
  handleReset: () => void;
  highestPageVisited: number;
  page: number;
  pageItems: T[];
}

interface UsePaginateInput<T> {
  items?: T[];
  onPaginate?: (page?: number) => void;
  page?: number;
  pageSize?: number;
}

export const usePaginate = <T>({
  items,
  onPaginate,
  page: _page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: UsePaginateInput<T>): UsePaginateState<T> => {
  const [page, setPage] = React.useState(_page);
  const visitedRef = React.useRef(_page);

  const handleReset = React.useRef(() => {
    setPage(_page);
    // set `visitedRef` to initially provided `page`
    visitedRef.current = _page;
  }).current;

  const handlePaginate = React.useCallback(
    (nextPage: number) => {
      if (nextPage < 1) return;

      if (isFunction(onPaginate)) onPaginate(nextPage);

      if (nextPage > visitedRef.current) visitedRef.current = nextPage;

      setPage(nextPage);
    },
    [onPaginate]
  );

  return React.useMemo((): UsePaginateState<T> => {
    const hasItems = items?.length;
    const highestPageVisited = visitedRef.current;

    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    const pageItems = hasItems ? items.slice(start, end) : [];

    return { handlePaginate, handleReset, highestPageVisited, page, pageItems };
  }, [handlePaginate, handleReset, items, page, pageSize]);
};
