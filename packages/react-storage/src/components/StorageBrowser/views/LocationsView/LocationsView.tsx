import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../do-not-import-from-here/actions';
import { resolveClassName } from '../utils';
import { useLocationsView } from './useLocationsView';
import { ControlsContextProvider } from '../../controls/context';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { DataTableControl } from '../../controls/DataTableControl';

import { LocationsViewProps } from './types';
import { getLocationsViewTableData } from './getLocationsViewTableData';

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
  ...props
}: LocationsViewProps): React.JSX.Element {
  const {
    pageItems,
    hasError,
    isPaginatePreviousDisabled,
    isPaginateNextDisabled,
    page,
    isLoading,
    onRefresh,
    onPaginateNext,
    onPaginatePrevious,
    onNavigate,
  } = useLocationsView(props);

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATIONS_VIEW"
    >
      <ControlsContextProvider
        data={{
          isDataRefreshDisabled: isLoading,
          tableData: getLocationsViewTableData({ pageItems, onNavigate }),
        }}
        onRefresh={onRefresh}
      >
        <Title>Home</Title>
        <DataRefreshControl
          className={`${CLASS_BASE}__locations-view-data-refresh`}
        />
        <Paginate
          currentPage={page}
          disableNext={isPaginateNextDisabled}
          disablePrevious={isPaginatePreviousDisabled}
          handleNext={onPaginateNext}
          handlePrevious={onPaginatePrevious}
        />
        <LocationsMessage />
        <Loading />
        {hasError ? null : (
          <DataTableControl
            className={`${CLASS_BASE}__locations-view-data-table`}
          />
        )}
        <LocationsEmptyMessage />
      </ControlsContextProvider>
    </div>
  );
}
