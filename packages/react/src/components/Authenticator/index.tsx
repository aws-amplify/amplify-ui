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
import { useAmplify } from '../../hooks';
import { AuthenticatorContext } from './AuthenticatorContext';
import { ConfirmSignIn } from './ConfirmSignIn';
import { ConfirmSignUp } from './ConfirmSignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ConfirmResetPassword, ResetPassword } from './ResetPassword';
import { SetupTOTP } from './SetupTOTP';
import { SignInSignUpTabs } from './shared';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
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

  const {
    components: {
      // @ts-ignore How to tell the context that this may exist for this scope?
      ConfirmSignUp = Authenticator.ConfirmSignUp,
      // @ts-ignore How to tell the context that this may exist for this scope?
      SignIn = Authenticator.SignIn,
      // @ts-ignore How to tell the context that this may exist for this scope?
      SignUp = Authenticator.SignUp,
      Wrapper,
    },
  } = useAmplify('Authenticator');

  const actorState = getActorState(state);

  return (
    <AuthenticatorContext.Provider value={service}>
      <Wrapper className={className} data-amplify-authenticator="">
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
      </Wrapper>
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
