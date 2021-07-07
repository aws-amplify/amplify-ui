<<<<<<< HEAD
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import awsExports from "auth-with-email-environment";
=======
import { Authenticator } from "aws-amplify-react";
import { Amplify } from "aws-amplify";
import awsExports from "auth-with-email-environment/src/aws-exports";
>>>>>>> origin/main

Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
<<<<<<< HEAD
  return <Authenticator />;
=======
  return <Authenticator usernameAttributes="email" />;
>>>>>>> origin/main
}
