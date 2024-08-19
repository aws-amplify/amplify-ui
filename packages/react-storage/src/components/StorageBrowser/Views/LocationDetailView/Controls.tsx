import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { Controls, LocationDetailViewTable } from '../Controls';
import { CommonControl } from '../types';
import { useAction } from '../../context/actions';

const {
  ActionSelect,
  Message,
  Navigate,
  Refresh,
  Title: TitleElement,
} = Controls;

export interface LocationDetailViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'Title' | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

export const Title = (): React.JSX.Element => {
  const [{ history }] = useControl({
    type: 'NAVIGATE',
  });
  const title = history.slice(-1)[0];
  return <TitleElement>{title}</TitleElement>;
};

const LocationDetailViewRefresh = () => {
  const [{ history }] = useControl({
    type: 'NAVIGATE',
  });

  const [{ data, isLoading }, handleList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const prefix = history.join('');

  return (
    <Refresh
      disabled={isLoading || data.result.length <= 0}
      onClick={() =>
        handleList({ prefix, options: { refresh: true, pageSize: 1000 } })
      }
    />
  );
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

// @ts-expect-error TODO: add Controls assignment
export const LocationDetailViewControls: LocationDetailViewControls = () => {
  return (
    <>
      <Navigate />
      <Title />
      <LocationDetailViewRefresh />
      <ActionSelect />
      <LocationDetailMessage />
      <LocationDetailViewTable />
    </>
  );
};
