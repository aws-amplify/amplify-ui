import * as React from 'react';

import { Authenticator, AuthenticatorProps } from './Authenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export function withAuthenticator(
  Component,
  options?: WithAuthenticatorOptions
) {
  return function WrappedWithAuthenticator() {
    return (
      <Authenticator {...options}>
        {(props) => <Component {...props} />}
      </Authenticator>
    );
  };
}
