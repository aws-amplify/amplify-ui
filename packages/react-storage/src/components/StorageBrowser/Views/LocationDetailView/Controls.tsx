import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { ActionsMenuControl } from './Controls/ActionsMenu';
import { Controls, LocationDetailViewTable } from '../Controls';
import { CommonControl } from '../types';
import { useAction } from '../../context/actions';

const {
  EmptyMessage,
  Loading: LoadingElement,
  Message,
  Navigate,
  Paginate,
  Refresh,
  Title: TitleElement,
} = Controls;

export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'Title' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

export const Title = (): React.JSX.Element => {
  const [{ history }] = useControl({ type: 'NAVIGATE' });

  const { prefix } = history.slice(-1)[0];

  return <TitleElement>{prefix}</TitleElement>;
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

  return isLoading ? <LoadingElement /> : null;
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

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return (
    <>
      <Navigate />
      <Title />
      <RefreshControl />
      <ActionsMenuControl />
      <Paginate />
      <LocationDetailMessage />
      <Loading />
      <LocationDetailViewTable />
      <LocationDetailEmptyMessage />
    </>
  );
};
