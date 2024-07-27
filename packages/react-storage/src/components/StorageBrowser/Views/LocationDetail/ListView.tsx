import React from 'react';

import { useAction } from '../../context/actions';
import { StorageBrowserElements } from '../../context/elements';
import { CommonControl, ViewComponent } from '../types';
import { Controls, TableControl } from '../Controls';
import { ViewTypeProvider } from '../ViewContext';

// will only work amplify buckets with access level set to "public"
const TEMP_PREFIX = 'public/';

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

const ListViewProvider = (props: { children?: React.ReactNode }) => (
  <ViewTypeProvider {...props} type="LOCATION_ITEMS_LIST" />
);

export const ListView: ListView = () => {
  const [{ data, isLoading }, handleListItems] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  React.useEffect(() => {
    handleListItems({ prefix: TEMP_PREFIX });
  }, [handleListItems]);

  const hasItems = !!data.items.length;
  const listItems = !hasItems
    ? null
    : data.items.map(({ key }) => <p key={key}>{key}</p>);

  return (
    <ListViewProvider>
      {isLoading && !hasItems ? 'loading...' : listItems}
    </ListViewProvider>
  );
};

ListView.Controls = ListViewControls;
ListView.Provider = ListViewProvider;
ListView.Table = TableControl;
