import * as React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { Provider, useAuthenticator } from './hooks/useAuthenticator';
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
  AuthenticatorMachineOptions & ComponentsProviderProps & RouterProps
>;

// Helper component that sends init event to the parent provider
function InitMachine({
  children,
  ...data
}: AuthenticatorMachineOptions & { children: React.ReactNode }) {
  // TODO: `INIT` event should be removed so that `_send` doesn't need to be extracted
  const { _send, route } = useAuthenticator(({ route }) => [route]);

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current && route === 'setup') {
      _send({ type: 'INIT', data });

      hasInitialized.current = true;
    }
  }, [_send, route, data]);

  return <>{children}</>;
}

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/authenticator)
 */
export function Authenticator({
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
}: AuthenticatorProps) {
  const components = { ...defaultComponents, ...customComponents };
  const machineProps = {
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
    formFields,
  };
  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <InitMachine {...machineProps}>
          <Router
            className={className}
            hideSignUp={hideSignUp}
            variation={variation}
          >
            {children}
          </Router>
        </InitMachine>
      </CustomComponentsContext.Provider>
    </Provider>
  );
}

Authenticator.Provider = Provider;
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
Authenticator.ForceNewPassword = ForceNewPassword;
