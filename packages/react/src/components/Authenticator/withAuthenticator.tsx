import { Authenticator, AuthenticatorProps } from './Authenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export function withAuthenticator(
  Component,
  options: WithAuthenticatorOptions = {}
) {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator(props) {
    return (
      <Authenticator variation={variation} {...options}>
        {(authenticator) => <Component {...props} {...authenticator} />}
      </Authenticator>
    );
  };
}
