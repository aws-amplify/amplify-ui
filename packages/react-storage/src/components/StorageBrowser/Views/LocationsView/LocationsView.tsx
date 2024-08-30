import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../context/actions';

import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';

import { DataTableControl } from './Controls/DataTable';

const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};

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

const LocationsMessage = (): React.JSX.Element | null => {
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

export const LocationsView: LocationsView = () => {
  const [{ data, isLoading }, handleList] = useLocationsData();

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;

  // initial load
  React.useEffect(() => {
    handleList({
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  }, [handleList]);

  const onPaginateNext = () =>
    handleList({
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
  } = usePaginate({ onPaginateNext, pageSize: DEFAULT_PAGE_SIZE });

  const { disableNext, disablePrevious, disableRefresh, range } =
    listViewHelpers({
      currentPage,
      hasNextToken,
      isLoading,
      pageSize: DEFAULT_PAGE_SIZE,
      resultCount,
    });

  return (
    <div className={CLASS_BASE} data-testid="LOCATIONS_VIEW">
      <Title>Home</Title>
      <RefreshControl
        disableRefresh={disableRefresh}
        handleRefresh={() => {
          handleReset();
          handleList({
            options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
          });
        }}
      />
      <Paginate
        currentPage={currentPage}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          handlePaginateNext({ resultCount, hasNextToken });
        }}
        handlePrevious={handlePaginatePrevious}
      />
      <LocationsMessage />
      <Loading />
      <DataTableControl range={range} />
      <LocationsEmptyMessage />
    </div>
  );
};
