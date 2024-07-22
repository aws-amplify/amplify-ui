import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { ActionView } from './ActionView';
import { ListView } from './ListView';

export interface LocationDetailView<
  _T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  ActionView: ActionView;
  ListView: ListView;
}

export const LocationDetailView: LocationDetailView = () => {
  const action = undefined;

  if (action) {
    return <ActionView />;
  }

  return <ListView />;
};
LocationDetailView.ActionView = ActionView;
LocationDetailView.ListView = ListView;
