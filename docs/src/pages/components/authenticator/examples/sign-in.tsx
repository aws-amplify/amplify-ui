import { Authenticator } from "aws-amplify-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui/dist/style.css";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

export default function Example() {
  return <Authenticator />;
}
