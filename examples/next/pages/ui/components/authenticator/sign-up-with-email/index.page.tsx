import { Amplify, Auth } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
  const services = {
    async handleSignUp(formData) {
      const { username, password, attributes } = formData;
      // custom username
      const newAttributes = {
        ...attributes,
        email: attributes.email.toLowerCase(),
      };
      return Auth.signUp({
        username: username.toLowerCase(),
        password,
        attributes: newAttributes,
      });
    },
  };

  return (
    <Authenticator services={services} initialState="signUp">
      {({ signOut }) => <button onClick={signOut}>Sign out</button>}
    </Authenticator>
  );
}
