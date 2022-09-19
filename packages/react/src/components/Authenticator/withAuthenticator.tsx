import React from 'react';
import { Authenticator, AuthenticatorProps } from './Authenticator';
import { UseAuthenticator } from './hooks/useAuthenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

type AuthenticatorHOCProps = Partial<
  Pick<UseAuthenticator, 'signOut' | 'user'>
>;

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function withAuthenticator<Props = {}>(
  Component: React.ComponentType<Props & AuthenticatorHOCProps>,
  options: WithAuthenticatorOptions = {}
): (props: Props) => JSX.Element {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator variation={variation} {...options}>
        {(authenticatorHOCProps: AuthenticatorHOCProps) => (
          <Component {...props} {...authenticatorHOCProps} />
        )}
      </Authenticator>
    );
  };
}
