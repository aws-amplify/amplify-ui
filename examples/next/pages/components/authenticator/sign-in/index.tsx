import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "auth-with-username-no-attributes-environment/src/aws-exports";

Amplify.configure(awsExports);

export default function AuthenticatorWithUsername() {
  return (
    <>
      <Authenticator>
        {({ state, send }) => {
          return (
            <>
              <h1>Hello {state.context.user.username}</h1>
              <button onClick={() => send("SIGN_OUT")}>Sign out</button>
            </>
          );
        }}
      </Authenticator>
    </>
  );
}
