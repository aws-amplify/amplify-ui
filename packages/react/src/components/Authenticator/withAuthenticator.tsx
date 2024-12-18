import React from 'react';
import { AuthUser } from 'aws-amplify/auth';

import { Authenticator, AuthenticatorProps, SignOut } from './Authenticator';
export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export interface WithAuthenticatorProps {
  signOut?: SignOut;
  user?: AuthUser;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function withAuthenticator<Props = {}>(
  Component: React.ComponentType<Props & WithAuthenticatorProps>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => React.JSX.Element {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator variation={variation} {...options}>
        {(withAuthenticatorProps: WithAuthenticatorProps) => (
          <Component {...props} {...withAuthenticatorProps} />
        )}
      </Authenticator>
    );
  };
}
