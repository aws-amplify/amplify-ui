import { Amplify } from 'aws-amplify'; // IGNORE
import { Authenticator } from '@aws-amplify/ui-react';
import { signUp, SignUpInput } from 'aws-amplify/auth';
import awsExports from './aws-exports'; // IGNORE
Amplify.configure(awsExports); // IGNORE

export default function App() {
  const services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const { username, password, options } = input;
      const customUsername = username.toLowerCase();
      const customEmail = options?.userAttributes?.email.toLowerCase();
      return signUp({
        username: customUsername,
        password,
        options: {
          ...input.options,
          userAttributes: {
            ...input.options?.userAttributes,
            email: customEmail,
          },
        },
      });
    },
  };
  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
