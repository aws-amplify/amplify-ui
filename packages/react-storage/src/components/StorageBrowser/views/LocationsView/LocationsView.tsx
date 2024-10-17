import React from 'react';
import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../context/actions';
import { resolveClassName } from '../utils';
import { DataTableControl } from './Controls/DataTable';
import { LocationAccess } from '../../context/types';
import { useLocationsView } from './useLocationsView';

export interface LocationsViewProps {
  className?: (defaultClassName: string) => string;
}

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

const {
  EmptyMessage,
  Loading: LoadingElement,
  Message,
  Paginate,
  Refresh,
  Title,
} = Controls;

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
  const [{ data, isLoading, hasError }, handleAction] = useLocationsView();

  const { getProcessedItems, hasMoreData, page } = data;

  const handleLocationClick = (location: LocationAccess) => {
    handleAction({ type: 'SELECT_LOCATION', location });
  };

  const disableNext = !hasMoreData || isLoading || hasError;
  const disablePrevious = page <= 1 || isLoading || hasError;

  return (
    <div
      className={resolveClassName(CLASS_BASE, className)}
      data-testid="LOCATIONS_VIEW"
    >
      <Title>Home</Title>
      <RefreshControl
        disableRefresh={isLoading}
        handleRefresh={() => {
          handleAction({ type: 'REFRESH' });
        }}
      />
      <Paginate
        currentPage={page}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          handleAction({ type: 'PAGINATE_NEXT' });
        }}
        handlePrevious={() => {
          handleAction({ type: 'PAGINATE_PREVIOUS' });
        }}
      />
      <LocationsMessage />
      <Loading />
      {hasError ? null : (
        <DataTableControl
          items={getProcessedItems()}
          handleLocationClick={handleLocationClick}
        />
      )}
      <LocationsEmptyMessage />
    </div>
  );
}
