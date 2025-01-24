import React from 'react';

import {
  CustomActionConfigs,
  DefaultActionConfigs,
  ExtendedActionConfigs,
  ListLocations,
} from './actions';
import { GetLocationCredentials } from './credentials/types';
import { Components } from './ComponentsProvider';
import { RegisterAuthListener, StoreProviderProps } from './providers';

import {
  CopyViewType,
  CreateFolderViewType,
  DeleteViewType,
  UploadViewType,
  LocationActionViewType,
  LocationDetailViewType,
  LocationsViewType,
  Views,
  UseView,
} from './views';

import { StorageBrowserDisplayText } from './displayText';

import { DerivedActionHandlers, UseAction } from './useAction';

export interface Config {
  accountId?: string;
  customEndpoint?: string;
  getLocationCredentials: GetLocationCredentials;
  listLocations: ListLocations;
  registerAuthListener: RegisterAuthListener;
  region: string;
}

export interface StorageBrowserActions {
  default?: DefaultActionConfigs;
  custom?: CustomActionConfigs;
}

export interface CreateStorageBrowserInput {
  actions?: StorageBrowserActions;
  config: Config;
  components?: Components;
}

export interface StorageBrowserProps<K = string, V = {}> {
  displayText?: StorageBrowserDisplayText;
  views?: Views<K, V>;
}

export interface StorageBrowserProviderProps<V = {}>
  extends StoreProviderProps {
  displayText?: StorageBrowserDisplayText;
  // `views` intentionally scoped to custom slots to prevent conflicts with composability
  views?: V;
}

export interface StorageBrowserType<K = string, V = {}> {
  (props: StorageBrowserProps<K, V>): React.JSX.Element;
  displayName: string;
  Provider: (props: StorageBrowserProviderProps<V>) => React.JSX.Element;
  CopyView: CopyViewType;
  CreateFolderView: CreateFolderViewType;
  DeleteView: DeleteViewType;
  UploadView: UploadViewType;
  LocationActionView: LocationActionViewType<K>;
  LocationDetailView: LocationDetailViewType;
  LocationsView: LocationsViewType;
}

type DefaultActionType<T = string> = Exclude<T, keyof DefaultActionConfigs>;

/**
 * @internal @unstable
 */
export type DerivedActionViews<T extends StorageBrowserActions> = {
  [K in keyof T['custom'] as K extends DefaultActionType<K>
    ? T['custom'][K] extends { viewName: `${string}View` }
      ? T['custom'][K]['viewName']
      : never
    : never]?: () => React.JSX.Element | null;
};

/**
 * @internal @unstable
 */
export type DerivedActionViewType<T extends StorageBrowserActions> =
  | keyof {
      [K in keyof T['custom'] as K extends DefaultActionType<K>
        ? T['custom'][K] extends { viewName: `${string}View` }
          ? K
          : never
        : never]?: any;
    }
  | Exclude<keyof DefaultActionConfigs, 'download'>;

export interface CreateStorageBrowserOutput<
  C extends ExtendedActionConfigs = ExtendedActionConfigs,
> {
  StorageBrowser: StorageBrowserType<
    DerivedActionViewType<C>,
    DerivedActionViews<C>
  >;
  useAction: UseAction<DerivedActionHandlers<C>>;
  useView: UseView;
}
