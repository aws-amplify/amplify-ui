import { authMachine, getActorState } from '@aws-amplify/ui-core';
import { useAmplify } from '../../hooks';
import { useActor, useInterpret } from '@xstate/react';

import { AuthenticatorContext } from './AuthenticatorContext';
import { ConfirmSignIn } from './ConfirmSignIn';
import { ConfirmSignUp } from './ConfirmSignUp';
import { ForceNewPassword } from './ForceNewPassword';
import { ConfirmResetPassword, ResetPassword } from './ResetPassword';
import { SetupTOTP } from './SetupTOTP';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export function Authenticator({
  className = null,
  children = (context) => null,
}) {
  const service = useInterpret(authMachine, {
    devTools: process.env.NODE_ENV === 'development',
  });

  const [state, send] = useActor(service);

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

  if (state.matches('authenticated')) {
    return children({ state, send });
  }
  const actorState = getActorState(state);

  return (
    <AuthenticatorContext.Provider value={service}>
      <Wrapper className={className} data-amplify-authenticator="">
        {(() => {
          switch (true) {
            case state.matches('idle'):
              return null;
            case actorState?.matches('confirmSignUp'):
              return <ConfirmSignUp />;
            case actorState?.matches('confirmSignIn'):
              return <ConfirmSignIn />;
            case actorState?.matches('setupTOTP'):
              return <SetupTOTP />;
            case actorState?.matches('signIn'):
              return <SignIn />;
            case actorState?.matches('signUp'):
              return <SignUp />;
            case actorState?.matches('forceNewPassword'):
              return <ForceNewPassword />;
            case state.matches('resetPassword'):
              return <ResetPassword />;
            case state.matches('confirmResetPassword'):
              return <ConfirmResetPassword />;
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

export function withAuthenticator(Component) {
  return function WrappedWithAuthenticator() {
    return (
      <Authenticator>{(context) => <Component {...context} />}</Authenticator>
    );
  };
}
