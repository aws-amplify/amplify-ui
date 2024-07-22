import React from 'react';
import { useDataState } from '@aws-amplify/ui-react-core';
import { listLocationItemsAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { CommonControl, ViewComponent } from '../types';
import { Controls, TableControl } from '../Controls';

interface ListViewControls<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<
    Controls<T>,
    CommonControl | 'ActionSelect' | 'Paginate' | 'Refresh' | 'Search'
  > {
  (): React.JSX.Element;
}

export interface ListView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<T, ListViewControls<T>> {}

// @ts-expect-error
const ListViewControls: ListViewControls = {};

export const ListView: ListView = () => {
  const [{ data, isLoading }, handleListItems] = useDataState(
    listLocationItemsAction,
    { items: [], nextToken: undefined }
  );

  React.useEffect(() => {
    handleListItems({ options: { pageSize: 100 } });
  }, [handleListItems]);

  const hasItems = !!data.items.length;
  const listItems = !hasItems
    ? null
    : data.items.map(({ key }) => <p key={key}>{key}</p>);

  return <>{isLoading && !hasItems ? 'loading...' : listItems}</>;
};

ListView.Controls = ListViewControls;
ListView.Table = TableControl;
