import { useSpark } from "@aws-amplify/spark-react";
import { SignIn } from "./SignIn";

export function Authenticator({ className }) {
  const {
    components: {
      // @ts-ignore How to tell the context that this may exist for this scope?
      SignIn = Authenticator.SignIn,
      Wrapper,
    },
  } = useSpark("Authenticator");

  return (
    <Wrapper className={className} data-spark-authenticator="">
      <SignIn />
    </Wrapper>
  );
}

Authenticator.SignIn = SignIn;
