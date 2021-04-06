// @refresh reset
import * as React from "react";
import { useAmplify, useAuth } from "../../hooks";

import tailwind from "tailwind-rn";

import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export function Authenticator({ className, children = (context) => null }) {
  const [state, send] = useAuth();

  const {
    components: {
      Button,
      Heading,
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
    <Wrapper
      className={className}
      data-amplify-authenticator=""
      style={tailwind(
        "max-w-md mx-auto overflow-hidden text-base text-gray-700 rounded-md shadow"
      )}
    >
      {(() => {
        switch (true) {
          case state.matches("idle"):
            return null;
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
  );
}

Authenticator.SignIn = SignIn;
Authenticator.SignUp = SignUp;
