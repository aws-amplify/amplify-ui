import React, { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setUserAgent } from '@aws-amplify/ui';
import {
  AuthenticatorProvider as Provider,
  AuthenticatorMachineContext,
  resolveAuthenticatorComponents,
  useAuthenticator,
  useAuthenticatorRoute,
  useAuthenticatorInitMachine,
} from '@aws-amplify/ui-react-core';

import { useDeprecationWarning } from '../hooks';
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
  useDeprecationWarning({
    message:
      'The `passwordSettings` prop has been deprecated and will be removed in a future major version of Amplify UI.',
    // shouldWarn: !!options?.passwordSettings,
    /**
     * @migration turn off until getConfig returns zero config
     */
    shouldWarn: false,
  });

  React.useEffect(() => {
    const clearUserAgent = setUserAgent({
      componentName: 'Authenticator',
      packageName: 'react-native',
      version: VERSION,
    });
    return () => clearUserAgent();
  }, []);

  useAuthenticatorInitMachine(options);

  const { authStatus, fields, route } = useAuthenticator(routePropSelector);

  const components = useMemo(
    // allow any to prevent TS from assuming that all fields are of type `TextFieldOptions`
    () => resolveAuthenticatorComponents<TypedField | any>(DEFAULTS, overrides),
    [overrides]
  );

  const { Component, props } = useAuthenticatorRoute({ components });

  const typedFields = getRouteTypedFields({ fields, route });

  if (authStatus === 'authenticated') {
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
