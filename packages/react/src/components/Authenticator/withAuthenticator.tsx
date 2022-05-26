import { Authenticator, AuthenticatorProps } from './Authenticator';

export type WithAuthenticatorOptions = Omit<AuthenticatorProps, 'children'>;

export function withAuthenticator<Props>(
  Component: (props?: Props) => JSX.Element,
  options: WithAuthenticatorOptions = {}
) {
  const { variation = 'modal' } = options;

  return function WrappedWithAuthenticator(props: Props) {
    return (
      <Authenticator variation={variation} {...options}>
        {(authenticator) => <Component {...props} {...authenticator} />}
      </Authenticator>
    );
  };
}
