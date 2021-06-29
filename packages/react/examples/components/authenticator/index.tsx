import { Authenticator } from "aws-amplify-react";
import { Amplify } from "aws-amplify";
import awsExports from "../../../../../environments/auth-with-username/src/aws-exports";

// Uncomment this line for styles
// import "@aws-amplify/ui/dist/style.css";

Amplify.configure(awsExports);

export default function AuthenticatorWithUsername() {
  return <Authenticator />;
}
