import * as React from 'react';
import { AuthenticatorMachineOptions } from '@aws-amplify/ui';

import { Provider, useAuthenticator } from './hooks/useAuthenticator';
import {
  CustomComponentsContext,
  ComponentsProviderProps,
} from './hooks/useCustomComponents';
import {
  Router,
  RouterContainer,
  RouterContainerProps,
  RouterProps,
} from './Router';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ResetPassword } from './ResetPassword';
import { defaultComponents } from './hooks/useCustomComponents/defaultComponents';

import {
  AuthenticatorChildren,
  AuthenticatorChildrenProps,
} from './AuthenticatorChildren';

export type AuthenticatorProps = Partial<
  AuthenticatorMachineOptions &
    ComponentsProviderProps &
    Omit<RouterContainerProps, 'children'> &
    RouterProps
> & { children?: AuthenticatorChildrenProps['authenticatedChildren'] };

// Helper hook that sends init event to the parent provider
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

export function Authenticator({
  children: authenticatedChildren,
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

  useInitMachine({
    formFields,
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
  });

  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <AuthenticatorChildren authenticatedChildren={authenticatedChildren}>
          <RouterContainer className={className} variation={variation}>
            <Router hideSignUp={hideSignUp} />
          </RouterContainer>
        </AuthenticatorChildren>
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
