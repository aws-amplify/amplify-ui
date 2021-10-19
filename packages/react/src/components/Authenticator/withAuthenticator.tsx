import * as React from 'react';

import { Authenticator } from './Authenticator';

export function withAuthenticator(
  Component,
  options?: Omit<Parameters<typeof Authenticator>, 'children'>
) {
  return function WrappedWithAuthenticator() {
    return (
      <Authenticator {...options}>
        {(...props) => <Component {...props} />}
      </Authenticator>
    );
  };
}
