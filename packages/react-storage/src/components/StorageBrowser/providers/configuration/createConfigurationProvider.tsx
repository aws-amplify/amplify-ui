import React from 'react';
import { isComponent } from '@aws-amplify/ui-react-core/elements';

import { ActionConfigsProvider } from '../../actions';
import { CredentialsProvider } from './credentials';

import { ConfigurationProvider } from './context';
import { CreateConfigurationProviderInput } from './types';

const Passthrough = ({ children }: { children?: React.ReactNode }) => (
  <>{children}</>
);

export function createConfigurationProvider<T extends React.ComponentType<any>>(
  input: CreateConfigurationProviderInput<T>
): (props: React.ComponentProps<T>) => React.JSX.Element {
  const { accountId, actions, displayName, options, region, ...rest } = input;
  const { ChildProvider } = options ?? {};

  const Child = isComponent(ChildProvider) ? ChildProvider : Passthrough;

  const Provider = (props: React.ComponentProps<T>) => (
    <ActionConfigsProvider {...actions}>
      <CredentialsProvider {...rest}>
        <ConfigurationProvider accountId={accountId} region={region}>
          <Child {...props} />
        </ConfigurationProvider>
      </CredentialsProvider>
    </ActionConfigsProvider>
  );

  Provider.displayName = displayName;
  return Provider;
}
