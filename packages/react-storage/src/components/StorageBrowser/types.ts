import React from 'react';

import { StorageBrowserElements } from './context/elements';
import {
  DividerControl,
  HistoryControl,
  RefreshControl,
  SearchControl,
  TitleControl,
} from './Views';

export interface Controls<T extends StorageBrowserElements> {
  (): React.JSX.Element;
  Divider: DividerControl<T>;
  History: HistoryControl<T>;
  Search: SearchControl<T>;
  Refresh: RefreshControl<T>;
  Title: TitleControl<T>;
}

export interface StorageBrowser<T extends StorageBrowserElements> {
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
