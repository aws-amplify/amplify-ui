import React, { useMemo } from 'react';

import {
  AuthenticatorProvider as Provider,
  AuthenticatorMachineContext,
  resolveAuthenticatorComponents,
  useAuthenticator,
  useAuthenticatorRoute,
  useAuthenticatorInitMachine,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { DefaultContainer } from './common';
import { TypedField, useRouteTypedFields } from './hooks';
import { AuthenticatorProps } from './types';

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
};

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

  const { fields, route } = useAuthenticator(routePropSelector);

  const components = useMemo(
    // allow any to prevent TS from assuming that all fields are of type `TextFieldOptions`
    () => resolveAuthenticatorComponents<TypedField | any>(DEFAULTS, overrides),
    [overrides]
  );

  const { Component, props } = useAuthenticatorRoute({ components });

  const typedFields = useRouteTypedFields({ fields, route });

  if (isAuthenticatedRoute(route)) {
    return children ? <>{children}</> : null;
  }

  return (
    <DefaultContainer>
      <Component {...props} fields={typedFields} />
    </DefaultContainer>
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
