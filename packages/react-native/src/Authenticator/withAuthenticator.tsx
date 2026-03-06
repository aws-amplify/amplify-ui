import React from 'react';
import Authenticator from './Authenticator';
import type { WithAuthenticatorOptions } from './types';

export default function withAuthenticator<Props = {}>(
  Component: React.ComponentType<Props>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => React.JSX.Element {
  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator.Provider>
        <Authenticator {...options}>
          <Component {...(props as Props & React.JSX.IntrinsicAttributes)} />
        </Authenticator>
      </Authenticator.Provider>
    );
  };
}
