import React from 'react';
import { isString } from '@aws-amplify/ui';

import { LocationData, useAction } from '../../context/actions';
import { useControl } from '../../context/control';
import { parseLocationAccess } from '../../context/navigate/utils';

import { Controls, LocationDetailViewTable } from '../Controls';
import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';

import { ActionsMenuControl } from './Controls/ActionsMenu';

export const DEFAULT_ERROR_MESSAGE = 'There was an error loading items.';
const DEFAULT_PAGE_SIZE = 100;
export const DEFAULT_LIST_OPTIONS = {
  pageSize: DEFAULT_PAGE_SIZE,
  delimiter: '/',
};

const DEFAULT_REFRESH_OPTIONS = { ...DEFAULT_LIST_OPTIONS, refresh: true };

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
  const [state] = useControl('NAVIGATE');
  const { path } = state;

  const [{ data, isLoading, hasError }, handleList] = useAction(
    'LIST_LOCATION_ITEMS'
  );
  const [, handleLocationActionsState] = useControl('LOCATION_ACTIONS');

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const hasValidPath = isString(path);

  const onPaginateNext = () => {
    if (!hasValidPath) return;

    handleLocationActionsState({ type: 'CLEAR' });
    handleList({
      prefix: path,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const onPaginatePrevious = () => {
    if (!hasValidPath) return;

    handleLocationActionsState({ type: 'CLEAR' });
  };

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
  } = usePaginate({
    onPaginateNext,
    onPaginatePrevious,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  React.useEffect(() => {
    if (!hasValidPath) return;

    handleReset();

    handleList({
      prefix: path,
      options: DEFAULT_REFRESH_OPTIONS,
    });
  }, [path, handleList, handleReset, hasValidPath]);

  const {
    disableActionsMenu,
    disableNext,
    disablePrevious,
    disableRefresh,
    range,
    renderLoading,
  } = listViewHelpers({
    currentPage,
    hasNextToken,
    isLoading,
    pageSize: DEFAULT_PAGE_SIZE,
    resultCount,
    hasError,
  });

  return (
    <>
      <Navigate />
      <Title />
      <RefreshControl
        disableRefresh={disableRefresh}
        handleRefresh={() => {
          if (!hasValidPath) return;
          handleReset();
          handleList({
            prefix: path,
            options: DEFAULT_REFRESH_OPTIONS,
          });
          handleLocationActionsState({ type: 'CLEAR' });
        }}
      />
      <ActionsMenuControl disabled={disableActionsMenu} />
      <Paginate
        currentPage={currentPage}
        disableNext={disableNext}
        disablePrevious={disablePrevious}
        handleNext={() => {
          handlePaginateNext({ resultCount, hasNextToken });
        }}
        handlePrevious={handlePaginatePrevious}
      />
      <LocationDetailMessage />
      <Loading show={renderLoading} />
      <LocationDetailViewTable range={range} />
      <LocationDetailEmptyMessage />
    </>
  );
};
