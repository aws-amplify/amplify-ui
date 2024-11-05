import React from 'react';

import { useStore } from '../../providers/store';
import { Controls, LocationDetailViewTable } from '../Controls';
import { ActionsMenuControl } from './Controls/ActionsMenu';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';
import { NavigationControl } from '../../controls/NavigationControl';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { CLASS_BASE } from '../constants';
import { SearchControl } from '../../controls/SearchControl';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const {
  EmptyMessage,
  Loading: LoadingControl,
  Message,
  Paginate,
  Title: TitleControl,
} = Controls;

export const Title = (): React.JSX.Element => {
  const [{ location }] = useStore();
  const { current, key } = location;
  const { bucket, prefix } = current ?? {};

  return <TitleControl>{prefix ? key : bucket}</TitleControl>;
};

function Loading({ show }: { show?: boolean }) {
  return show ? <LoadingControl /> : null;
}

export const LocationDetailMessage = ({
  show,
  message,
}: {
  show?: boolean;
  message?: string;
}): React.JSX.Element | null => {
  return show ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationDetailEmptyMessage = ({ show }: { show?: boolean }) => {
  return show ? <EmptyMessage>No items to show.</EmptyMessage> : null;
};

export const LocationDetailViewControls = ({
  onActionSelect,
  onNavigate: onNavigateProp,
  onExit,
}: Omit<
  LocationDetailViewProps,
  'children' | 'className'
>): React.JSX.Element => {
  const {
    pageItems,
    isLoading,
    page,
    isPaginatePreviousDisabled,
    isPaginateNextDisabled,
    location,
    hasError,
    message,
    onRefresh,
    onPaginateNext,
    onPaginatePrevious,
    onAddFiles,
    onNavigate,
    onNavigateHome,
    onSearch,
  } = useLocationDetailView({ onNavigate: onNavigateProp, onExit });

  // FIXME:
  const shouldShowEmptyMessage =
    pageItems.length === 0 && !isLoading && !hasError;
  const contextValue: ControlsContext = {
    data: {
      isDataRefreshDisabled: isLoading,
      location,
    },
    onNavigate,
    onNavigateHome,
    onRefresh,
    onSearch,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <NavigationControl
        className={`${CLASS_BASE}__location-detail-view-navigation`}
      />
      <Title />
      <DataRefreshControl
        className={`${CLASS_BASE}__locations-detail-view-data-refresh`}
      />
      <ActionsMenuControl
        onActionSelect={onActionSelect}
        disabled={isLoading}
      />
      <SearchControl />
      <Paginate
        currentPage={page}
        disableNext={isPaginateNextDisabled}
        disablePrevious={isPaginatePreviousDisabled}
        handleNext={onPaginateNext}
        handlePrevious={onPaginatePrevious}
      />
      <LocationDetailMessage show={hasError} message={message} />
      <Loading show={isLoading} />
      <LocationDetailViewTable
        show={pageItems.length > 0 && !hasError}
        items={pageItems}
        handleDroppedFiles={onAddFiles}
        handleLocationItemClick={onNavigate}
      />
      <LocationDetailEmptyMessage show={shouldShowEmptyMessage} />
    </ControlsContextProvider>
  );
};
