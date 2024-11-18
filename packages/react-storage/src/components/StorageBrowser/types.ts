import React from 'react';

import { ListLocations } from './actions';

import { StorageBrowserElements } from './context/elements';
import { Components } from './ComponentsProvider';

import { RegisterAuthListener, StoreProviderProps } from './providers';

import {
  CopyViewType,
  CreateFolderViewType,
  DeleteViewType,
  UploadViewType,
  LocationActionViewProps,
  LocationDetailViewType,
  LocationsViewType,
  Views,
} from './views';

import { GetLocationCredentials } from './credentials/types';
import { StorageBrowserDisplayText } from './displayText';

export interface Config {
  accountId?: string;
  customEndpoint?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

export interface CreateStorageBrowserInput {
  // to be updated
  actions?: never;
  config: Config;
  components?: Components;
  elements?: Partial<StorageBrowserElements>;
}

export interface StorageBrowserProps<T = string> {
  views?: Views<T>;
  displayText?: StorageBrowserDisplayText;
}

export interface StorageBrowserType<T = string, K = {}> {
  (
    props: StorageBrowserProps & Exclude<K, keyof StorageBrowserProps>
  ): React.JSX.Element;
  displayName: string;
  Provider: (props: StorageBrowserProviderProps) => React.JSX.Element;
  CopyView: CopyViewType;
  CreateFolderView: CreateFolderViewType;
  DeleteView: DeleteViewType;
  UploadView: UploadViewType;
  LocationActionView: (
    props: LocationActionViewProps<T>
  ) => React.JSX.Element | null;
  LocationDetailView: LocationDetailViewType;
  LocationsView: LocationsViewType;
}

export type ActionViewName<T = string> = Exclude<
  T,
  'listLocationItems' | 'listLocations'
>;

export interface StorageBrowserProviderProps extends StoreProviderProps {
  displayText?: StorageBrowserDisplayText;
}
