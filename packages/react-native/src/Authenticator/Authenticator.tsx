import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {
  AuthenticatorProvider as Provider,
  AuthenticatorMachineContext,
  resolveAuthenticatorComponents,
  useAuthenticator,
  useAuthenticatorRoute,
  useAuthenticatorInitMachine,
  UseAuthenticator,
} from '@aws-amplify/ui-react-core';

import { configureComponent } from '@aws-amplify/ui';

import { DefaultContainer, InnerContainer } from './common';
import { TypedField, getRouteTypedFields } from './hooks';
import { AuthenticatorProps } from './types';
import { VERSION } from '../version';

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
  Container = DefaultContainer,
  Footer,
  Header,
  ...options
}: AuthenticatorProps): JSX.Element | null {
  React.useEffect(() => {
    configureComponent({
      packageName: '@aws-amplify/ui-react-native',
      version: VERSION,
    });
  }, []);

  useAuthenticatorInitMachine(options);

  const { fields, route } = useAuthenticator(routePropSelector);

  const components = useMemo(
    // allow any to prevent TS from assuming that all fields are of type `TextFieldOptions`
    () => resolveAuthenticatorComponents<TypedField | any>(DEFAULTS, overrides),
    [overrides]
  );

  const { Component, props } = useAuthenticatorRoute({ components });

  const typedFields = getRouteTypedFields({ fields, route });

  if (isAuthenticatedRoute(route)) {
    return children ? <>{children}</> : null;
  }

  return (
    <SafeAreaProvider>
      <Container>
        {Header ? <Header /> : null}
        <InnerContainer>
          <Component {...props} fields={typedFields} />
        </InnerContainer>
        {Footer ? <Footer /> : null}
      </Container>
    </SafeAreaProvider>
  );
}

// assign slot components
Authenticator.Container = DefaultContainer;
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
