import { Authenticator } from "aws-amplify-react";
import { Amplify } from "aws-amplify";
import awsExports from "auth-with-email-environment/src/aws-exports";

Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
  return <Authenticator usernameAttributes="email" />;
}
