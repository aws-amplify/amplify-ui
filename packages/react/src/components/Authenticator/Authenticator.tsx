import { AuthenticatorMachineOptions } from '@aws-amplify/ui';
import { PartialDeep } from 'src/types';
import { defaultComponents } from './hooks/defaultComponents';
import { startAuthMachine } from './hooks/useAuthenticator';
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
  components,
  initialState,
  loginMechanisms,
  services,
  signUpAttributes,
  socialProviders,
  variation,
}: AuthenticatorProps) {
  // First start auth machine
  startAuthMachine({
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
  });

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
