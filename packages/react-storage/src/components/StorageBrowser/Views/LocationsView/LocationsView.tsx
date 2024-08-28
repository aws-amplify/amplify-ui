import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../context/actions';
import { DataTableControl } from './Controls/DataTable';

const {
  EmptyMessage,
  Loading: LoadingElement,
  Message,
  Paginate,
  Refresh,
  Title,
} = Controls;

export interface LocationsView<_T = unknown> {
  (): React.JSX.Element;
}

const RefreshControl = ({
  disableRefresh,
  handleRefresh,
}: {
  disableRefresh?: boolean;
  handleRefresh?: () => void;
}) => {
  return <Refresh disabled={disableRefresh} onClick={handleRefresh} />;
};

const Loading = () => {
  const [{ isLoading }] = useLocationsData();
  return isLoading ? <LoadingElement /> : null;
};

export const LocationsMessage = (): React.JSX.Element | null => {
  const [{ hasError, message }] = useLocationsData();
  return hasError ? (
    <Message variant="error">
      {message ?? 'There was an error loading locations.'}
    </Message>
  ) : null;
};

const LocationsEmptyMessage = () => {
  const [{ data, isLoading, hasError }] = useLocationsData();
  const shouldShowEmptyMessage =
    data.result.length === 0 && !isLoading && !hasError;

  return shouldShowEmptyMessage ? (
    <EmptyMessage>No locations to show.</EmptyMessage>
  ) : null;
};

const PAGE_SIZE = 5;

export const usePaginate = ({
  hasNext,
  onPaginateNext,
  resultCount,
}: {
  hasNext: boolean;
  onPaginateNext: () => void;
  resultCount: number;
}): {
  currentPage: string;
  disableNext: boolean;
  disablePrevious: boolean;
  handlePaginateNext: () => void;
  handlePaginatePrevious: () => void;
  range: [start: number, end: number];
  reset: () => void;
} => {
  const [page, setPage] = React.useState(1);

  const highestPageVisited = Math.round(resultCount / PAGE_SIZE);
  const shouldPaginate = highestPageVisited === page && hasNext;

  const disablePrevious = page <= 1;

  const start = page === 1 ? 0 : (page - 1) * PAGE_SIZE;
  const end = page === 1 ? PAGE_SIZE : page * PAGE_SIZE;

  const handlePaginateNext = () => {
    if (shouldPaginate) {
      onPaginateNext();
    }
    setPage((prev) => prev + 1);
  };

  const handlePaginatePrevious = () => {
    setPage((prev) => prev - 1);
  };

  return {
    currentPage: `${page}`,
    disablePrevious,
    disableNext: !hasNext,
    handlePaginateNext,
    handlePaginatePrevious,
    range: [start, end],
    reset: () => {
      setPage(1);
    },
  };
};

export const LocationsView: LocationsView = () => {
  const [{ data, isLoading }, handleList] = useLocationsData();

  // initial load
  React.useEffect(() => {
    handleList({
      options: { exclude: 'WRITE', pageSize: PAGE_SIZE, refresh: true },
    });
  }, [handleList]);

  const resultCount = data.result.length;
  const {
    currentPage,
    disableNext,
    disablePrevious,
    handlePaginateNext,
    handlePaginatePrevious,
    range,
    reset,
  } = usePaginate({
    hasNext: !!data.nextToken,
    onPaginateNext: () =>
      handleList({
        options: {
          pageSize: PAGE_SIZE,
          nextToken: data.nextToken,
          exclude: 'WRITE',
        },
      }),
    resultCount,
  });

  return (
    <div className={CLASS_BASE} data-testid="LOCATIONS_VIEW">
      <Title>Home</Title>
      <RefreshControl
        disableRefresh={isLoading || resultCount === 0}
        handleRefresh={() => {
          reset();
          handleList({
            options: { pageSize: PAGE_SIZE, refresh: true, exclude: 'WRITE' },
          });
        }}
      />
      <Paginate
        currentPage={currentPage}
        disableNext={disableNext || isLoading}
        disablePrevious={disablePrevious || isLoading}
        handleNext={handlePaginateNext}
        handlePrevious={handlePaginatePrevious}
      />
      <LocationsMessage />
      <Loading />
      <DataTableControl range={range} />
      <LocationsEmptyMessage />
    </div>
  );
};
