import React from 'react';

import { useAction } from '../../context/actions';
import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';
import { useControl } from '../../context/controls';
import { Controls, LocationDetailViewTable } from '../Controls';
import { ActionsMenuControl } from './Controls/ActionsMenu';

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
  const [{ history }] = useControl({ type: 'NAVIGATE' });

  const { prefix } = history.slice(-1)[0];

  return <TitleControl>{prefix}</TitleControl>;
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

const Loading = () => {
  const [{ isLoading }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  return isLoading ? <LoadingControl /> : null;
};

export const LocationDetailMessage = (): React.JSX.Element | null => {
  const [{ hasError, message }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  return hasError ? (
    <Message variant="error">{message ?? DEFAULT_ERROR_MESSAGE}</Message>
  ) : null;
};

const LocationDetailEmptyMessage = () => {
  const [{ data, hasError, isLoading }] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });
  const shouldShowEmptyMessage =
    data.result.length === 0 && !isLoading && !hasError;

  return shouldShowEmptyMessage ? (
    <EmptyMessage>No items to show.</EmptyMessage>
  ) : null;
};

export const LocationDetailViewControls = (): React.JSX.Element => {
  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const [{ path }] = useControl({ type: 'NAVIGATE' });

  React.useEffect(() => {
    handleList({
      prefix: path,
      options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
    });
  }, [path, handleList]);

  const onPaginateNext = () =>
    handleList({
      prefix: path,
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
    });

  return (
    <>
      <Navigate />
      <Title />
      <RefreshControl
        disableRefresh={disableRefresh}
        handleRefresh={() => {
          handleReset();
          handleList({
            prefix: path,
            options: { ...DEFAULT_LIST_OPTIONS, refresh: true },
          });
        }}
      />
      <ActionsMenuControl />
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
      <Loading />
      <LocationDetailViewTable range={range} />
      <LocationDetailEmptyMessage />
    </>
  );
};
