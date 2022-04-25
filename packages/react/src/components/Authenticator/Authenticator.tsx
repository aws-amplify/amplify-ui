import * as React from 'react';
import {
  AuthenticatorMachineOptions,
  AuthEventData,
  CognitoUserAmplify,
} from '@aws-amplify/ui';

import { AuthenticatorContainerProps } from './AuthenticatorContainer';
import { Provider, useAuthenticator } from './hooks/useAuthenticator';
import { CustomComponentsContext } from './hooks/useCustomComponents';
import {
  defaultComponents,
  DefaultComponents,
} from './hooks/useCustomComponents/defaultComponents';
import { AuthenticatorContainer } from './AuthenticatorContainer';
import { Router } from './Router';

type AuthenticatorChildren =
  | React.ReactNode
  | (({
      signOut,
      user,
    }: {
      signOut?: (data?: AuthEventData) => void;
      user?: CognitoUserAmplify;
    }) => React.ReactNode);

export type AuthenticatorProps = {
  children?: AuthenticatorChildren;
  className?: AuthenticatorContainerProps['className'];
  components?: DefaultComponents;
  hideSignUp?: boolean;
  variation?: AuthenticatorContainerProps['variation'];
} & AuthenticatorMachineOptions;

interface InitMachineProps extends AuthenticatorMachineOptions {
  authenticatorChildren: AuthenticatorChildren;
  children: React.ReactNode;
}
// Helper component that sends init event to the parent provider
function InitMachine({
  authenticatorChildren,
  children,
  ...data
}: InitMachineProps) {
  // TODO: `INIT` event should be removed so that `_send` doesn't need to be extracted
  const { _send, route, signOut, user } = useAuthenticator(
    ({ route, signOut, user }) => [route, signOut, user]
  );

  const hasInitialized = React.useRef(false);
  React.useEffect(() => {
    if (!hasInitialized.current && route === 'setup') {
      _send({ type: 'INIT', data });

      hasInitialized.current = true;
    }
  }, [_send, route, data]);

  const isAuthenticatedRoute = route === 'authenticated' || route === 'signOut';
  const ChildComponent = React.useMemo(() => {
    if (!isAuthenticatedRoute) {
      return children;
    }

    // `Authenticator` might not have user defined `authenticatorChildren` for non SPA use cases.
    if (!authenticatorChildren) {
      return null;
    }

    return typeof authenticatorChildren === 'function'
      ? authenticatorChildren({ signOut, user }) // authenticatorChildren is a render prop
      : authenticatorChildren;
  }, [authenticatorChildren, children, isAuthenticatedRoute, signOut, user]);

  return <>{ChildComponent}</>;
}

// use Authenticator namespace for both the component and the interface
// to ensure that Typescript adds the correct properties on the component
interface Authenticator {
  (props: AuthenticatorProps): JSX.Element;
  Provider?: ({ children }: { children: React.ReactNode }) => JSX.Element;
  ForceNewPassword?: DefaultComponents['ForceNewPassword'];
  ResetPassword?: DefaultComponents['ResetPassword'];
  SetupTOTP?: DefaultComponents['SetupTOTP'];
  SignIn?: DefaultComponents['SignIn'];
  SignUp?: DefaultComponents['SignUp'];
}

export const Authenticator: Authenticator = ({
  children: authenticatorChildren,
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
}) => {
  const components = { ...defaultComponents, ...customComponents };
  const machineProps = {
    formFields,
    initialState,
    loginMechanisms,
    services,
    signUpAttributes,
    socialProviders,
  };

  return (
    <Provider>
      <CustomComponentsContext.Provider value={{ components }}>
        <InitMachine
          {...machineProps}
          authenticatorChildren={authenticatorChildren}
        >
          <AuthenticatorContainer className={className} variation={variation}>
            <Router hideSignUp={hideSignUp} />
          </AuthenticatorContainer>
        </InitMachine>
      </CustomComponentsContext.Provider>
    </Provider>
  );
};
