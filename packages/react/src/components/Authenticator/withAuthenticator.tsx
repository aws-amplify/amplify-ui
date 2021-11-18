import * as React from 'react';

import { Authenticator, AuthenticatorProps } from './Authenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export function withAuthenticator(
  Component,
  options: WithAuthenticatorOptions = {}
) {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator() {
    return (
      <Authenticator variation={variation} {...options}>
        {(props) => <Component {...props} />}
      </Authenticator>
    );
  };
}
