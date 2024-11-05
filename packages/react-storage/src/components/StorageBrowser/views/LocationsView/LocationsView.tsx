import React from 'react';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import { resolveClassName } from '../utils';
import { DataTableControl } from './Controls/DataTable';
import { useLocationsView } from './useLocationsView';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { SearchControl } from '../../controls/SearchControl';

import { LocationsViewProps } from './types';
import { ViewElement } from '../../context/elements';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading locations.';

const {
  EmptyMessage,
  Loading: LoadingElement,
  Message,
  Paginate,
  Title,
} = Controls;

const Loading = ({ show }: { show: boolean }) => {
  return show ? <LoadingElement /> : null;
};

const LocationsMessage = ({
  show,
  message,
}: {
  show: boolean;
  message?: string;
}): React.JSX.Element | null => {
  return show ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationsEmptyMessage = ({ show }: { show: boolean }) => {
  return show ? <EmptyMessage>No locations to show.</EmptyMessage> : null;
};

export function LocationsView({
  className,
  ...props
}: LocationsViewProps): React.JSX.Element {
  const {
    hasError,
    hasNextPage,
    highestPageVisited,
    page,
    isLoading,
    pageItems,
    message,
    searchPlaceholder,
    onRefresh,
    onPaginate,
    onNavigate,
    onSearch,
  } = useLocationsView(props);

  // FIXME: Eventually comes from useView hook
  const shouldShowEmptyMessage =
    pageItems.length === 0 && !isLoading && !hasError;
  const contextValue: ControlsContext = {
    data: {
      isDataRefreshDisabled: isLoading,
      searchPlaceholder,
    },
    onSearch,
    onRefresh,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <div
        className={resolveClassName(CLASS_BASE, className)}
        data-testid="LOCATIONS_VIEW"
      >
        <Title>Home</Title>
        <ViewElement className={`${CLASS_BASE}__location-detail-view-controls`}>
          <SearchControl className={`${CLASS_BASE}__locations-view-search`} />
          <Paginate
            currentPage={page}
            highestPageVisited={highestPageVisited}
            hasMorePages={hasNextPage}
            onPaginate={onPaginate}
          />
          <DataRefreshControl
            className={`${CLASS_BASE}__locations-view-data-refresh`}
          />
        </ViewElement>
        <LocationsMessage show={hasError} message={message} />
        <Loading show={isLoading} />
        {hasError ? null : (
          <DataTableControl onNavigate={onNavigate} items={pageItems} />
        )}
        <LocationsEmptyMessage show={shouldShowEmptyMessage} />
      </div>
    </ControlsContextProvider>
  );
}
