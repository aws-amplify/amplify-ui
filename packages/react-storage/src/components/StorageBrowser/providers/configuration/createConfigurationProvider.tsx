import React from 'react';
import { isComponent } from '@aws-amplify/ui-react-core/elements';

import { ActionConfigsProvider } from '../../actions';
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
    actions,
    ChildComponent,
    displayName,
    region,
    customEndpoint,
    ...rest
  } = input;

  const Child = isComponent(ChildComponent) ? ChildComponent : Passthrough;

  const Provider: ConfigurationProviderComponent<T> = (props) => (
    <ActionConfigsProvider actions={actions}>
      <CredentialsProvider {...rest}>
        <GetActionInputProvider
          accountId={accountId}
          region={region}
          customEndpoint={customEndpoint}
        >
          <Child {...props} />
        </GetActionInputProvider>
      </CredentialsProvider>
    </ActionConfigsProvider>
  );

  Provider.displayName = displayName;
  return Provider;
}
