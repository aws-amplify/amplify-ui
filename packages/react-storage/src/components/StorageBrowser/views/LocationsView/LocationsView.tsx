import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { useLocationsData } from '../../do-not-import-from-here/actions';
import { resolveClassName } from '../utils';
import { DataTableControl } from './Controls/DataTable';
import { LocationData } from '../../actions';
import { useLocationsView } from './useLocationsView';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { DataRefreshControl } from '../../controls/DataRefreshControl';

export interface LocationsViewProps {
  className?: (defaultClassName: string) => string;
  onNavigate?: (destination: LocationData) => void;
}

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
  onNavigate,
}: LocationsViewProps): React.JSX.Element {
  const locationsView = useLocationsView({ onNavigate });
  const { pageItems, hasError, disableNext, disablePrevious, page, isLoading } =
    locationsView;

  // FIXME: Eventually comes from useView hook
  const contextValue: ControlsContext = {
    data: {
      isDataRefreshDisabled: isLoading,
    },
    onRefresh: locationsView.onRefresh,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <div
        className={resolveClassName(CLASS_BASE, className)}
        data-testid="LOCATIONS_VIEW"
      >
        <Title>Home</Title>
        <DataRefreshControl
          className={`${CLASS_BASE}__locations-view-data-refresh`}
        />
        <Paginate
          currentPage={page}
          disableNext={disableNext}
          disablePrevious={disablePrevious}
          handleNext={locationsView.onPaginateNext}
          handlePrevious={locationsView.onPaginatePrevious}
        />
        <LocationsMessage />
        <Loading />
        {hasError ? null : (
          <DataTableControl
            handleLocationClick={locationsView.onNavigate}
            items={pageItems}
          />
        )}
        <LocationsEmptyMessage />
      </div>
    </ControlsContextProvider>
  );
}
