import { Authenticator } from "aws-amplify-react";
import { Amplify } from "aws-amplify";

import awsExports from "@environments/auth-with-phone-and-sms-mfa/src/aws-exports";

Amplify.configure(awsExports);

export default function AuthenticatorWithSmsMfa() {
  return <Authenticator />;
}
