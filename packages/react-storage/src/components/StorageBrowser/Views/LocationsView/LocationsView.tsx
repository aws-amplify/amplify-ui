import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../context/actions';

import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';

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

const PAGE_SIZE = 10;

export const LocationsView: LocationsView = () => {
  const [{ data, isLoading }, handleList] = useLocationsData();

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;

  // initial load
  React.useEffect(() => {
    handleList({
      options: { exclude: 'WRITE', pageSize: PAGE_SIZE, refresh: true },
    });
  }, [handleList]);

  const onPaginateNext = () =>
    handleList({
      options: { pageSize: PAGE_SIZE, nextToken },
    });

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
  } = usePaginate({ onPaginateNext, pageSize: PAGE_SIZE });

  const { disableNext, disablePrevious, disableRefresh, range } =
    listViewHelpers({
      currentPage,
      hasNextToken,
      isLoading,
      pageSize: PAGE_SIZE,
      resultCount,
    });

  return (
    <div className={CLASS_BASE} data-testid="LOCATIONS_VIEW">
      <Title>Home</Title>
      <RefreshControl
        disableRefresh={disableRefresh}
        handleRefresh={() => {
          handleReset();
          handleList({ options: { pageSize: PAGE_SIZE, refresh: true } });
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
