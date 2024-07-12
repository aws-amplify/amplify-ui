import React from 'react';

import { StorageBrowserElements } from './context/elements';
import { SearchControl, TitleControl } from './Views';

export interface Controls<T extends Partial<StorageBrowserElements>> {
  (): React.JSX.Element;
  Search: SearchControl<T>;
  Title: TitleControl<T>;
}

export interface StorageBrowser<T extends Partial<StorageBrowserElements>> {
  (): React.JSX.Element;
  LocationsListView: () => React.JSX.Element;
  LocationDetailView: () => React.JSX.Element;
  Controls: Controls<T>;
  Provider: (props: { children?: React.ReactNode }) => React.JSX.Element;
}

export interface CreateStorageBrowserInput<
  T extends Partial<StorageBrowserElements>,
> {
  elements?: T;
}
