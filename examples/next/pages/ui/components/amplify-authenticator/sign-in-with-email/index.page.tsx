import { AmplifyAuthenticator } from '@aws-amplify/ui-react/legacy';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';

Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <h1>Welcome!</h1>
    </AmplifyAuthenticator>
  );
}
