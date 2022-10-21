import React, { useMemo } from 'react';

import {
  AuthenticatorProvider as Provider,
  AuthenticatorComponentDefaults,
  AuthenticatorMachineContext,
  resolveAuthenticatorComponents,
  useAuthenticator,
  useAuthenticatorRoute,
  useAuthenticatorInitMachine,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { AuthenticatorProps, FormHandlers } from './types';
import {
  ConfirmResetPassword,
  ConfirmSignIn,
  ConfirmSignUp,
  ConfirmVerifyUser,
  ForceNewPassword,
  ResetPassword,
  SetupTOTP,
  SignIn,
  SignUp,
  VerifyUser,
} from './Defaults';

const DEFAULTS = {
  // TODO: remove cast after adding missing components
} as unknown as AuthenticatorComponentDefaults<FormHandlers>;

const isAuthenticatedRoute = (route: UseAuthenticator['route']) =>
  route === 'authenticated' || route === 'signOut';

const routePropSelector = ({
  route,
}: AuthenticatorMachineContext): AuthenticatorMachineContext['route'][] => [
  route,
];

function Authenticator({
  children,
  components: overrides,
  ...options
}: AuthenticatorProps): JSX.Element | null {
  useAuthenticatorInitMachine(options);

  const { route } = useAuthenticator(routePropSelector);

  const components = useMemo(
    () => resolveAuthenticatorComponents(DEFAULTS, overrides),
    [overrides]
  );

  const { Component, props } = useAuthenticatorRoute({ components });

  if (isAuthenticatedRoute(route)) {
    return children ? <>{children}</> : null;
  }

  return (
    <Component
      {...props}
      onBlur={() => null}
      onChangeText={() => null}
      onSubmit={() => null}
    />
  );
}

// assign slot components
Authenticator.Provider = Provider;
Authenticator.ConfirmResetPassword = ConfirmResetPassword;
Authenticator.ConfirmSignIn = ConfirmSignIn;
Authenticator.ConfirmSignUp = ConfirmSignUp;
Authenticator.ConfirmVerifyUser = ConfirmVerifyUser;
Authenticator.ForceNewPassword = ForceNewPassword;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.VerifyUser = VerifyUser;

export default Authenticator;
