import type React from 'react';

import type { ActionInputConfig, LocationData } from '../actions';
import type { CredentialsProviderProps } from '../credentials';

export type GetActionInput = (location?: LocationData) => ActionInputConfig;

export interface GetActionInputProviderProps {
  accountId?: string;
  children?: React.ReactNode;
  region: string;
  customEndpoint?: string;
}

export interface CreateConfigurationProviderInput<T>
  extends GetActionInputProviderProps,
    CredentialsProviderProps {
  ChildComponent?: T;
  displayName: string;
  region: string;
}

export interface ConfigurationProviderComponent<P> {
  (props: P): React.JSX.Element;
  displayName: string;
}
