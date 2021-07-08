// @refresh reset
import { authMachine } from "@aws-amplify/ui-core";
import { useAmplify } from "@aws-amplify/ui-react";
import { useActor, useInterpret } from "@xstate/react";

import { AuthenticatorContext } from "./AuthenticatorContext";
import { ConfirmSignIn } from './ConfirmSignIn';
import { ConfirmSignUp } from "./ConfirmSignUp";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export function Authenticator({
  className = null,
  children = context => null,
}) {
  const service = useInterpret(authMachine, {
    devTools: process.env.NODE_ENV === "development",
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
  } = useAmplify("Authenticator");

  if (state.matches("authenticated")) {
    return children({ state, send });
  }

  return (
    <AuthenticatorContext.Provider value={service}>
      <Wrapper className={className} data-amplify-authenticator="">
        {(() => {
          switch (true) {
            case state.matches("idle"):
              return null;
            case state.matches("confirmSignUp"):
              return <ConfirmSignUp />;
            case state.matches("confirmSignIn"):
              return <ConfirmSignIn />;
            case state.matches("signIn"):
              return <SignIn />;
            case state.matches("signUp"):
              return <SignUp />;
            default:
              console.warn("Unhandled Auth state", state);
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
