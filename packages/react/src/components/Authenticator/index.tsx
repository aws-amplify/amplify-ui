import {
  AuthenticatorMachineOptions,
  createAuthenticatorMachine,
  getActorState,
  getServiceFacade,
  translations,
} from '@aws-amplify/ui';
import { useMachine } from '@xstate/react';
import { I18n } from 'aws-amplify';
import * as React from 'react';
import { Flex, View } from '../../primitives';
import { useTheming } from '../../theming';
import { AuthenticatorContext } from './AuthenticatorContext';
import { ConfirmSignIn } from './ConfirmSignIn';
import { ConfirmSignUp } from './ConfirmSignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ConfirmResetPassword, ResetPassword } from './ResetPassword';
import { SetupTOTP } from './SetupTOTP';
import { SignInSignUpTabs } from './shared';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Texture } from './Texture';
import { ConfirmVerifyUser, VerifyUser } from './VerifyUser';

type AuthenticatorProps = AuthenticatorMachineOptions & {
  children: (facade: ReturnType<typeof getServiceFacade>) => JSX.Element;
  className?: string;
};

export function Authenticator({
  children = () => null,
  className = undefined,
  initialState = undefined,
  loginMechanisms = undefined,
}: AuthenticatorProps) {
  const { theme } = useTheming();

  const [state, send, service] = useMachine(
    () => createAuthenticatorMachine({ initialState, loginMechanisms }),
    {
      devTools: process.env.NODE_ENV === 'development',
    }
  );

  React.useEffect(() => {
    I18n.putVocabularies(translations);
  }, []);

  const facade = getServiceFacade({ send, state });

  if (state.matches('authenticated')) {
    return children(facade);
  }

  const actorState = getActorState(state);

  return (
    <AuthenticatorContext.Provider value={service}>
      <View
        className={className}
        backgroundColor="#e1e5e9"
        width="100vw"
        height="100vh"
        style={{
          // Override browser default `body { margin: 8px }`
          position: 'fixed',
          top: '0',
          left: '0',
        }}
      >
        <View
          as={Texture}
          width="100vw"
          height="100vh"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',

            // Soften the texture
            opacity: 0.35,
            filter: 'contrast(120%) brightness(120%)',
          }}
        />

        <Flex alignItems="center" justifyContent="center" height="100vh">
          <View
            backgroundColor={theme.colors.white}
            boxShadow="0px 0px 20px rgba(0, 0, 0, 0.1)"
            padding={
              state.matches('signIn') || state.matches('signUp')
                ? // SignInSignUpTabs already has padding
                  undefined
                : theme.space.xl
            }
            width={`${theme.breakpoints.values.small}${theme.breakpoints.unit}`}
            // Fix z-index of texture being over the Authenticator
            style={{ position: 'relative' }}
          >
            {(() => {
              switch (true) {
                case state.matches('authenticate'):
                  return null;
                case actorState?.matches('confirmSignUp'):
                  return <ConfirmSignUp />;
                case actorState?.matches('confirmSignIn'):
                  return <ConfirmSignIn />;
                case actorState?.matches('setupTOTP'):
                  return <SetupTOTP />;
                case actorState?.matches('signIn'):
                case actorState?.matches('signUp'):
                  return <SignInSignUpTabs />;
                case actorState?.matches('forceNewPassword'):
                  return <ForceNewPassword />;
                case actorState?.matches('resetPassword'):
                  return <ResetPassword />;
                case actorState?.matches('confirmResetPassword'):
                  return <ConfirmResetPassword />;
                case actorState?.matches('verifyUser'):
                  return <VerifyUser />;
                case actorState?.matches('confirmVerifyUser'):
                  return <ConfirmVerifyUser />;
                default:
                  console.warn('Unhandled Auth state', state.value);
                  return null;
              }
            })()}
          </View>
        </Flex>
      </View>
    </AuthenticatorContext.Provider>
  );
}

Authenticator.ConfirmSignUp = ConfirmSignUp;
Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;

export function withAuthenticator(
  Component,
  props?: Omit<AuthenticatorProps, 'children'>
) {
  return function WrappedWithAuthenticator() {
    return (
      <Authenticator {...props}>
        {(facade: ReturnType<typeof getServiceFacade>) => (
          <Component {...facade} />
        )}
      </Authenticator>
    );
  };
}
