import React from 'react';

import {
  ActionInputConfig,
  ActionConfigsProviderProps,
  LocationData,
} from '../../actions';

import { CredentialsProviderProps } from './credentials';

export type GetActionInput = (location?: LocationData) => ActionInputConfig;

export interface GetActionInputProviderProps {
  accountId?: string;
  children?: React.ReactNode;
  region: string;
  customEndpoint?: string;
}

export interface CreateConfigurationProviderInput<
  T extends React.ComponentType<any>,
> extends ActionConfigsProviderProps,
    GetActionInputProviderProps,
    CredentialsProviderProps {
  ChildComponent?: T;
  displayName: string;
  region: string;
}

export interface ConfigurationProviderComponent<
  T extends React.ComponentType<any>,
> {
  (props: React.ComponentProps<T>): React.JSX.Element;
  displayName: string;
}
