import React from 'react';

import { isFunction, isUndefined } from '@aws-amplify/ui';

import { useAction } from '../../do-not-import-from-here/actions';
import { useStore } from '../../providers/store';

import { Controls, LocationDetailViewTable } from '../Controls';
import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';

import { ActionsMenuControl } from './Controls/ActionsMenu';
import { LocationDetailViewProps } from './types';

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
  const [{ history }] = useStore();
  const { current } = history;
  const { bucket, prefix } = current ?? {};

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

export const LocationDetailViewControls = ({
  onActionSelect,
  onNavigate,
  onExit,
}: Omit<
  LocationDetailViewProps,
  'children' | 'className'
>): React.JSX.Element => {
  const [{ data, isLoading, hasError }, handleList] = useAction(
    'LIST_LOCATION_ITEMS'
  );

  const [{ history }, dispatchStoreAction] = useStore();
  const { current } = history;
  const { prefix } = current ?? {};
  const hasInvalidPrefix = isUndefined(prefix);

  const handleDroppedFiles = (files: File[]) => {
    dispatchStoreAction({ type: 'ADD_FILE_ITEMS', files });
    dispatchStoreAction({
      type: 'SET_ACTION_TYPE',
      actionType: 'UPLOAD_FILES',
    });

    if (isFunction(onActionSelect)) onActionSelect('UPLOAD_FILES');
  };

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;

  const onPaginateNext = () => {
    if (hasInvalidPrefix || !nextToken) return;

    handleList({ prefix, options: { ...DEFAULT_LIST_OPTIONS, nextToken } });
  };

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset: handlePaginateReset,
  } = usePaginate({ pageSize: DEFAULT_PAGE_SIZE, onPaginateNext });

  React.useEffect(() => {
    if (hasInvalidPrefix) return;

    handleList({ prefix, options: DEFAULT_REFRESH_OPTIONS });

    handlePaginateReset();
  }, [
    dispatchStoreAction,
    handleList,
    handlePaginateReset,
    hasInvalidPrefix,
    prefix,
  ]);

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

  const handleRefresh = () => {
    if (hasInvalidPrefix) return;
    handlePaginateReset();
    handleList({ prefix, options: DEFAULT_REFRESH_OPTIONS });
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
  };

  return (
    <>
      <Navigate onExit={onExit} />
      <Title />
      <RefreshControl
        disableRefresh={disableRefresh}
        handleRefresh={handleRefresh}
      />
      <ActionsMenuControl
        onActionSelect={onActionSelect}
        disabled={disableActionsMenu}
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
      <LocationDetailMessage />
      <Loading show={renderLoading} />
      <LocationDetailViewTable
        onNavigate={onNavigate}
        handleDroppedFiles={handleDroppedFiles}
        range={range}
      />
      <LocationDetailEmptyMessage />
    </>
  );
};
