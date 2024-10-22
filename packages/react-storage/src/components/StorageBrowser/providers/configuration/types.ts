import React from 'react';

import { ActionInputConfig, ActionConfigsProviderProps } from '../../actions';

import { CredentialsProviderProps } from './credentials';

export type GetActionInput = () => ActionInputConfig;

export interface ConfigurationProviderProps {
  accountId?: string;
  children?: React.ReactNode;
  region: string;
}

export interface CreateConfigurationProviderInput<
  T extends React.ComponentType<any>,
> extends ConfigurationProviderProps,
    ActionConfigsProviderProps,
    ConfigurationProviderProps,
    CredentialsProviderProps {
  displayName: string;
  options?: {
    ChildProvider?: T;
  };
  region: string;
}
