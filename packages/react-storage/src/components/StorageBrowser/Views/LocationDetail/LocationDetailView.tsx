import React from 'react';

import { StorageBrowserElements } from '../../context/elements';
import { ActionView } from './ActionView';
import { ListView } from './ListView';

import { useControlState } from '../useControlState';

export interface LocationDetailView<
  _T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  ActionView: ActionView;
  ListView: ListView;
}

export const LocationDetailView: LocationDetailView = () => {
  const [{ action }] = useControlState?.('ACTION_SELECT') ?? [
    { action: undefined },
  ];

  if (action) {
    return <ActionView />;
  }

  return <ListView />;
};
LocationDetailView.ActionView = ActionView;
LocationDetailView.ListView = ListView;
