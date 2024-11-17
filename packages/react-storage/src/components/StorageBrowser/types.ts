import React from 'react';

import { ListLocations } from './actions';

import { StorageBrowserElements } from './context/elements';
import { Components } from './ComponentsProvider';

import { RegisterAuthListener, StoreProviderProps } from './providers';

import {
  CopyViewInterface,
  CreateFolderViewInterface,
  DeleteViewInterface,
  UploadViewInterface,
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

export interface StorageBrowserComponent<T = string, K = {}> extends Views<T> {
  (
    props: StorageBrowserProps & Exclude<K, keyof StorageBrowserProps>
  ): React.JSX.Element;
  displayName: string;
  Provider: (props: StorageBrowserProviderProps) => React.JSX.Element;
  CopyView: CopyViewInterface;
  CreateFolderView: CreateFolderViewInterface;
  DeleteView: DeleteViewInterface;
  UploadView: UploadViewInterface;
}

export type ActionViewName<T = string> = Exclude<
  T,
  'listLocationItems' | 'listLocations'
>;

export interface StorageBrowserProviderProps extends StoreProviderProps {
  displayText?: StorageBrowserDisplayText;
}
