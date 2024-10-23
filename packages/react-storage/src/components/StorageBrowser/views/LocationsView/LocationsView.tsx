import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../context/actions';

import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers, resolveClassName } from '../utils';

import { DataTableControl } from './Controls/DataTable';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { DataRefreshControl } from '../../controls/DataRefreshControl';

export interface LocationsViewProps {
  className?: (defaultClassName: string) => string;
}

const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  exclude: 'WRITE' as const,
  pageSize: DEFAULT_PAGE_SIZE,
};
export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

const {
  EmptyMessage,
  Loading: LoadingElement,
  Message,
  Paginate,
  Title,
} = Controls;

const Loading = () => {
  const [{ isLoading }] = useLocationsData();
  return isLoading ? <LoadingElement /> : null;
};

const LocationsMessage = (): React.JSX.Element | null => {
  const [{ hasError, message }] = useLocationsData();
  return hasError ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
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

export function LocationsView({
  className,
}: LocationsViewProps): React.JSX.Element {
  const [{ data, isLoading, hasError }, handleList] = useLocationsData();

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
      hasError,
    });

  // FIXME: Eventually comes from useView hook
  const contextValue: ControlsContext = {
    data: {},
    actionsConfig: {
      type: 'SINGLE_ACTION',
      isCancelable: true, // Question(ashwinkumar6): is refresh Cancelable ?
      dataRefresh: {
        disabled: disableRefresh,
        onClick: () => {
          handleReset();
          handleList({
            options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
          });
        },
      },
    },
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <div
        className={resolveClassName(CLASS_BASE, className)}
        data-testid="LOCATIONS_VIEW"
      >
        <Title>Home</Title>
        <DataRefreshControl
          className={`${CLASS_BASE}__locations-view__data-refresh`}
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
    </ControlsContextProvider>
  );
}
