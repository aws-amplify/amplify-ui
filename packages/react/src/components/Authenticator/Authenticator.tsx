import React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { PartialDeep } from 'src/types';
import { useAuthenticator } from '..';
import { defaultComponents } from './hooks/defaultComponents';
import { CustomComponentsContext } from './hooks/useCustomComponents';
import { ResetPassword } from './ResetPassword';
import { Router, RouterProps } from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export type AuthenticatorProps = AuthenticatorMachineOptions &
  RouterProps & {
    components?: PartialDeep<typeof defaultComponents>;
    services?: AuthenticatorMachineOptions['services'];
  };

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
  const { _send } = useAuthenticator();
  const components = { ...defaultComponents, ...customComponents };

  React.useEffect(() => {
    _send({
      type: 'INIT',
      data: {
        initialState,
        loginMechanisms,
        socialProviders,
        signUpAttributes,
        services,
      },
    });
  }, []);

  return (
    <CustomComponentsContext.Provider value={{ components }}>
      <Router className={className} children={children} variation={variation} />
    </CustomComponentsContext.Provider>
  );
}

Authenticator.Provider = ({ children }) => <>{children}</>; // for backwards compatibility
Authenticator.ResetPassword = ResetPassword;
Authenticator.SetupTOTP = SetupTOTP;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
