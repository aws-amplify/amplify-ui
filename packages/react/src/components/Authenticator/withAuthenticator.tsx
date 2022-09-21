import React from 'react';
import { Authenticator, AuthenticatorProps } from './Authenticator';
import { AmplifyUser } from '@aws-amplify/ui';
import { UseAuthenticator } from './hooks/useAuthenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export interface WithAuthenticatorProps {
  signOut?: Pick<UseAuthenticator, 'signOut'>;
  user?: AmplifyUser;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function withAuthenticator<Props = {}>(
  Component: React.ComponentType<Props & WithAuthenticatorProps>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => JSX.Element {
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
