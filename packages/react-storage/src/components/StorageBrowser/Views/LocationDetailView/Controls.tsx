import React from 'react';

import { useAction } from '../../context/actions';
import { useControl } from '../../context/controls';
import { Controls } from '../Controls';
import { DataTableControl } from './Controls/DataTable';

import { ActionsMenuControl } from './Controls/ActionsMenu';

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

const RefreshControl = () => {
  const [{ path }] = useControl({ type: 'NAVIGATE' });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  return (
    <Refresh
      disabled={isLoading || data.result.length <= 0}
      onClick={() =>
        handleList({
          prefix: path,
          options: { refresh: true, pageSize: 1000, delimiter: '/' },
        })
      }
    />
  );
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
    <Message variant="error">
      {message ?? 'There was an error loading items.'}
    </Message>
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
  return (
    <>
      <Navigate />
      <Title />
      <RefreshControl />
      <ActionsMenuControl />
      <Paginate />
      <LocationDetailMessage />
      <Loading />
      <DataTableControl />
      <LocationDetailEmptyMessage />
    </>
  );
};
