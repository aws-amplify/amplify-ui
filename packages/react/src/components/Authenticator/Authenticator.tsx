import { useEffect } from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { Provider, useAuthenticator } from './hooks/useAuthenticator';
import { ResetPassword } from './ResetPassword';
import { Router, RouterProps } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import {
  CustomComponentsContext,
  ComponentsProviderProps,
} from './hooks/useCustomComponents';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

export interface ComponentsProp {}

export type AuthenticatorProps = AuthenticatorMachineOptions &
  RouterProps &
  ComponentsProviderProps;

export function Authenticator({
  children,
  className,
  components: customComponents,
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
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
  };

  // Helper component that sends init event to the parent provider
  function InitMachine({ children, ...machineProps }) {
    const { _send, route } = useAuthenticator();
    useEffect(() => {
      if (route === 'idle') {
        _send({
          type: 'INIT',
          data: machineProps,
        });
      }
    }, []);
    return <>{children}</>;
  }

  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <InitMachine {...machineProps}>
          <Router
            className={className}
            children={children}
            variation={variation}
          />
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
