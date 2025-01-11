import React from 'react';
import { isComponent } from '@aws-amplify/ui-react-core/elements';

import { CredentialsProvider } from './credentials';

import { GetActionInputProvider } from './context';
import {
  CreateConfigurationProviderInput,
  ConfigurationProviderComponent,
} from './types';

const Passthrough = ({ children }: { children?: React.ReactNode }) => (
  <>{children}</>
);

export function createConfigurationProvider<T extends React.ComponentType<any>>(
  input: CreateConfigurationProviderInput<T>
): ConfigurationProviderComponent<T> {
  const {
    accountId,
    ChildComponent,
    displayName,
    region,
    customEndpoint,
    ...rest
  } = input;

  const Child = isComponent(ChildComponent) ? ChildComponent : Passthrough;

  const Provider: ConfigurationProviderComponent<T> = (props) => (
    <CredentialsProvider {...rest}>
      <GetActionInputProvider
        accountId={accountId}
        region={region}
        customEndpoint={customEndpoint}
      >
        <Child {...props} />
      </GetActionInputProvider>
    </CredentialsProvider>
  );

  Provider.displayName = displayName;
  return Provider;
}
