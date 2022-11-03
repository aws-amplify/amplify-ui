import React from 'react';
import Authenticator from './Authenticator';
import { AuthenticatorProps } from './types';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export default function withAuthenticator<Props = {}>(
  Component: React.ComponentType<Props>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => JSX.Element {
  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator.Provider>
        <Authenticator {...options}>
          <Component {...(props as Props & JSX.IntrinsicAttributes)} />
        </Authenticator>
      </Authenticator.Provider>
    );
  };
}
