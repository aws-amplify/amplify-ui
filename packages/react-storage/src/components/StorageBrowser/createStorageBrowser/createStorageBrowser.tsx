import React from 'react';

import { setUserAgent } from '@aws-amplify/ui';

import { VERSION } from '../../../version';

import { ExtendedActionConfigs } from '../actions';
import { ErrorBoundary as DefaultErrorBoundary } from '../ErrorBoundary';
import { useAction } from '../useAction';
import { assertRegisterAuthListener } from '../validators';
import {
  CopyView,
  CreateFolderView,
  DeleteView,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  UploadView,
  LocationActionViewType,
  useView,
} from '../views';

import createProvider from './createProvider';
import StorageBrowserDefault from './StorageBrowserDefault';
import {
  CreateStorageBrowserInput,
  CreateStorageBrowserOutput,
  StorageBrowserType,
  DerivedActionViews,
  DerivedActionViewType,
} from './types';

const UA_CONFIG = {
  componentName: 'StorageBrowser',
  packageName: 'react-storage',
  version: VERSION,
} as const;

/**
 * Creates a `StorageBrowser` component and utility hooks from provided configuration `input`.
 *
 * @param input - `StorageBrowser` auth, actions and ui configuration values
 * @returns `StorageBrowser` component, `useAction` and `useView` hooks
 */
export default function createStorageBrowser<
  Input extends CreateStorageBrowserInput,
  RInput extends Input['actions'] extends ExtendedActionConfigs
    ? Input['actions']
    : ExtendedActionConfigs,
>(input: Input): CreateStorageBrowserOutput<RInput> {
  assertRegisterAuthListener(input.config.registerAuthListener);

  setUserAgent(UA_CONFIG);

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  const Provider = createProvider(input);

  const ErrorBoundary =
    input.ErrorBoundary === null
      ? React.Fragment
      : input.ErrorBoundary ?? DefaultErrorBoundary;

  const StorageBrowser: StorageBrowserType<
    DerivedActionViewType<RInput>,
    DerivedActionViews<RInput>
  > = (props) => (
    <ErrorBoundary>
      <Provider {...props}>
        <StorageBrowserDefault />
      </Provider>
    </ErrorBoundary>
  );

  StorageBrowser.LocationActionView =
    LocationActionView as LocationActionViewType<DerivedActionViewType<RInput>>;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.CopyView = CopyView;
  StorageBrowser.CreateFolderView = CreateFolderView;
  StorageBrowser.DeleteView = DeleteView;
  StorageBrowser.UploadView = UploadView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser, useAction, useView };
}
