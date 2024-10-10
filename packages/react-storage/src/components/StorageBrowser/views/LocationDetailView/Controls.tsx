import React from 'react';
import { isString } from '@aws-amplify/ui';

import { LocationData, useAction } from '../../context/actions';
import { useControl } from '../../context/control';
import { parseLocationAccess } from '../../context/navigate/utils';

import { Controls, LocationDetailViewTable } from '../Controls';
import { usePaginate } from '../hooks/usePaginate';
import { listViewHelpers } from '../utils';

import { ActionsMenuControl } from './Controls/ActionsMenu';
import { useHandleUpload } from '../LocationActionView/useHandleUpload';

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

  const [{ data, isLoading }, handleList] = useAction('LIST_LOCATION_ITEMS');

  const [, , handleFileSelect] = useHandleUpload({
    prefix: path,
    preventOverwrite: true,
  });
  const [, handleUpdateState] = useControl('LOCATION_ACTIONS');

  const handleDroppedFiles = (files: File[]) => {
    handleFileSelect(files);
    if (files[0].type) {
      handleUpdateState({
        type: 'SET_ACTION',
        actionType: 'UPLOAD_FILES',
        files,
      });
    } else {
      handleUpdateState({
        type: 'SET_ACTION',
        actionType: 'UPLOAD_FOLDER',
        files,
      });
    }
  };

  const { result, nextToken } = data;
  const resultCount = result.length;
  const hasNextToken = !!nextToken;
  const hasValidPath = isString(path);

  const onPaginateNext = () => {
    if (!hasValidPath) return;

    handleList({
      prefix: path,
      options: { ...DEFAULT_LIST_OPTIONS, nextToken },
    });
  };

  const {
    currentPage,
    handlePaginateNext,
    handlePaginatePrevious,
    handleReset,
  } = usePaginate({ onPaginateNext, pageSize: DEFAULT_PAGE_SIZE });

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
      <LocationDetailViewTable
        handleDroppedFiles={handleDroppedFiles}
        range={range}
      />
      <LocationDetailEmptyMessage />
    </>
  );
};
