import React from 'react';

import { setUserAgent } from '@aws-amplify/ui';

import { VERSION } from '../../../version';

import { ErrorBoundary as DefaultErrorBoundary } from '../ErrorBoundary';
import { useAction } from '../useAction';
import { assertRegisterAuthListener } from '../validators';
import type { LocationActionViewType } from '../views';
import {
  CopyView,
  CreateFolderView,
  DeleteView,
  DownloadView,
  LocationActionView,
  LocationDetailView,
  LocationsView,
  UploadView,
  useView,
} from '../views';

import createProvider from './createProvider';
import StorageBrowserDefault from './StorageBrowserDefault';
import type {
  CreateStorageBrowserInput,
  CreateStorageBrowserOutput,
  StorageBrowserType,
  DerivedActionViews,
  DerivedActionViewType,
} from './types';
import type { FileData } from '../actions/handlers';

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
  TResolver extends ((properties: FileData) => any) | undefined,
  TInput extends CreateStorageBrowserInput<TResolver>,
  TActions extends NonNullable<TInput['actions']>,
>(
  input: CreateStorageBrowserInput<TResolver>
): CreateStorageBrowserOutput<TActions> {
  assertRegisterAuthListener(input.config.registerAuthListener);

  setUserAgent(UA_CONFIG);

  /**
   * Provides state, configuration and action values that are shared between
   * the primary View components
   */
  const Provider = createProvider<TResolver>(input);

  const ErrorBoundary =
    input.ErrorBoundary === null
      ? React.Fragment
      : input.ErrorBoundary ?? DefaultErrorBoundary;

  const StorageBrowser: StorageBrowserType<
    DerivedActionViewType<TActions>,
    DerivedActionViews<TActions>
  > = (props) => (
    <ErrorBoundary>
      <Provider {...props}>
        <StorageBrowserDefault />
      </Provider>
    </ErrorBoundary>
  );

  StorageBrowser.LocationActionView =
    LocationActionView as LocationActionViewType<
      DerivedActionViewType<TActions>
    >;
  StorageBrowser.LocationDetailView = LocationDetailView;
  StorageBrowser.LocationsView = LocationsView;

  StorageBrowser.CopyView = CopyView;
  StorageBrowser.CreateFolderView = CreateFolderView;
  StorageBrowser.DeleteView = DeleteView;
  StorageBrowser.DownloadView = DownloadView;
  StorageBrowser.UploadView = UploadView;

  StorageBrowser.Provider = Provider;

  StorageBrowser.displayName = 'StorageBrowser';

  return { StorageBrowser, useAction, useView };
}
