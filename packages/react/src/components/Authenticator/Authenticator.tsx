import * as React from 'react';
import {
  AuthenticatorMachineOptions,
  CognitoUserAmplify,
} from '@aws-amplify/ui';

import {
  Provider,
  useAuthenticator,
  UseAuthenticator,
} from './hooks/useAuthenticator';
import {
  CustomComponentsContext,
  ComponentsProviderProps,
} from './hooks/useCustomComponents';
import { Router, RouterProps } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ResetPassword } from './ResetPassword';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

export type AuthenticatorProps = Partial<
  AuthenticatorMachineOptions &
    ComponentsProviderProps &
    RouterProps & {
      children:
        | React.ReactNode
        | ((props: {
            signOut?: UseAuthenticator['signOut'];
            user?: CognitoUserAmplify;
          }) => JSX.Element);
    }
>;

// Utility hook that sends init event to the parent provider
function useInitMachine(data: AuthenticatorMachineOptions) {
  // TODO: `INIT` event should be removed so that `_send` doesn't need to be extracted
  const { _send, route } = useAuthenticator(({ route }) => [route]);

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current && route === 'setup') {
      _send({ type: 'INIT', data });

      hasInitialized.current = true;
    }
  }, [_send, route, data]);
}

// `AuthenticatorInternal` exists to give access to the context returned via `useAuthenticator`,
// which allows the `Authenticator` to just return `children` if a user is authenticated.
// Once the `Provider` is removed from the `Authenticator` component and exported as
// `AuthenticatorProvider`, this component should be renamed to `Authenticator`.
export function AuthenticatorInternal({
  children,
  className,
  components: customComponents,
  formFields,
  hideSignUp,
  initialState,
  loginMechanisms,
  signUpAttributes,
  services,
  socialProviders,
  variation,
}: AuthenticatorProps): JSX.Element {
  const { route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  useInitMachine({
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
    formFields,
  });

  const value = React.useMemo(
    () => ({ components: { ...defaultComponents, ...customComponents } }),
    [customComponents]
  );

  const isAuthenticatedRoute = route === 'authenticated' || route === 'signOut';
  if (isAuthenticatedRoute) {
    // `Authenticator` might not have user defined `children` for non SPA use cases.
    if (!children) {
      return null;
    }

    return (
      <>
        {typeof children === 'function'
          ? children({ signOut, user }) // children is a render prop
          : children}
      </>
    );
  }

  return (
    <CustomComponentsContext.Provider value={value}>
      <Router
        className={className}
        hideSignUp={hideSignUp}
        variation={variation}
      />
    </CustomComponentsContext.Provider>
  );
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/connected-components/authenticator)
 */
export function Authenticator(props: AuthenticatorProps): JSX.Element {
  return (
    <Provider>
      <AuthenticatorInternal {...props} />
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.ForceNewPassword = ForceNewPassword;
