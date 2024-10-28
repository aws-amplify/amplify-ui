import React from 'react';

import { LocationData, useAction } from '../../context/actions';
import { useControl } from '../../context/control';
import { parseLocationAccess } from '../../context/navigate/utils';

import { Controls, LocationDetailViewTable, SearchControl } from '../Controls';

import { ActionsMenuControl } from './Controls/ActionsMenu';
import { useLocationDetailView } from './useLocationDetailView';

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
  Refresh,
  Title: TitleControl,
} = Controls;

export const Title = (): React.JSX.Element => {
  const [{ history, location }] = useControl('NAVIGATE');

  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  const prefix = history?.slice(-1)[0]?.prefix;

  return <TitleControl>{prefix ? prefix : bucket}</TitleControl>;
};

const RefreshControl = ({
  disableRefresh,
  handleRefresh,
}: {
  disableRefresh?: boolean;
  handleRefresh?: () => void;
}) => {
  return <Refresh disabled={disableRefresh} onClick={handleRefresh} />;
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

export const LocationDetailViewControls = (): React.JSX.Element => {
  const locationDetailView = useLocationDetailView();
  const { pageItems, isLoading, hasError, hasNextPage, page, onSearch } =
    locationDetailView;

  const handleDroppedFiles = (files: File[]) => {
    locationDetailView.onAddFiles(files);
  };

  const handleLocationItemClick = (key: string) => {
    locationDetailView.onAccessItem(key);
  };

  const disableNext = !hasNextPage || isLoading || hasError;
  const disablePrevious = page <= 1 || isLoading || hasError;

  return (
    <>
      <Navigate />
      <Title />
      <RefreshControl
        disableRefresh={isLoading}
        handleRefresh={() => {
          locationDetailView.onRefresh();
        }}
      />
      <ActionsMenuControl disabled={isLoading} />
      <Paginate
        currentPage={page}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          locationDetailView.onPaginateNext();
        }}
        handlePrevious={() => {
          locationDetailView.onPaginatePrevious();
        }}
      />
      <LocationDetailMessage />
      <Loading show={isLoading} />
      <SearchControl
        handleSearch={(term: string, includeSubfolders: boolean) => {
          onSearch(term, includeSubfolders);
        }}
      />
      <LocationDetailViewTable
        items={pageItems}
        handleDroppedFiles={handleDroppedFiles}
        handleLocationItemClick={handleLocationItemClick}
      />
      <LocationDetailEmptyMessage />
    </>
  );
};
