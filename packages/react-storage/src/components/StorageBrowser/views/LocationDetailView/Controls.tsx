import React from 'react';

import { useAction } from '../../do-not-import-from-here/actions';
import { useStore } from '../../providers/store';
import { Controls, LocationDetailViewTable } from '../Controls';

import { ActionsMenuControl } from './Controls/ActionsMenu';
import { useLocationDetailView } from './useLocationDetailView';
import { LocationDetailViewProps } from './types';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { DataRefreshControl } from '../../controls/DataRefreshControl';
import { CLASS_BASE } from '../constants';

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
  Navigate,
  Paginate,
  Title: TitleControl,
} = Controls;

export const Title = (): React.JSX.Element => {
  const [{ history }] = useStore();
  const { current } = history;
  const { bucket, prefix } = current ?? {};

  return <TitleControl>{prefix ? prefix : bucket}</TitleControl>;
};

function Loading({ show }: { show?: boolean }) {
  return show ? <LoadingControl /> : null;
}

export const LocationDetailMessage = (): React.JSX.Element | null => {
  const [{ hasError, message }] = useAction('LIST_LOCATION_ITEMS');

  return hasError ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationDetailEmptyMessage = () => {
  const [{ data, hasError, isLoading }] = useAction('LIST_LOCATION_ITEMS');
  const shouldShowEmptyMessage =
    data.result.length === 0 && !isLoading && !hasError;

  return shouldShowEmptyMessage ? (
    <EmptyMessage>No items to show.</EmptyMessage>
  ) : null;
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
    onRefresh,
    onPaginateNext,
    onPaginatePrevious,
    onAddFiles,
    onAccessItem,
  } = useLocationDetailView({ onNavigate: onNavigateProp });

  const contextValue: ControlsContext = {
    data: {
      isDataRefreshDisabled: isLoading,
    },
    onRefresh,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Navigate onExit={onExit} />
      <Title />
      <DataRefreshControl
        className={`${CLASS_BASE}__locations-detail-view-data-refresh`}
      />
      <ActionsMenuControl
        onActionSelect={onActionSelect}
        disabled={isLoading}
      />
      <Paginate
        currentPage={page}
        disableNext={isPaginateNextDisabled}
        disablePrevious={isPaginatePreviousDisabled}
        handleNext={onPaginateNext}
        handlePrevious={onPaginatePrevious}
      />
      <LocationDetailMessage />
      <Loading show={isLoading} />
      <LocationDetailViewTable
        items={pageItems}
        handleDroppedFiles={onAddFiles}
        handleLocationItemClick={onAccessItem}
      />
      <LocationDetailEmptyMessage />
    </ControlsContextProvider>
  );
};
