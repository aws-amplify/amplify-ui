// @todo-migration clean up imports
import { Amplify } from 'aws-amplify';
import * as Auth from 'aws-amplify/auth';
import { I18n } from '@aws-amplify/core';

import {
  Authenticator,
  translations,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import { getAuthenticatorConfig } from '@aws-amplify/ui';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const formFields = {
  confirmSignUp: {
    confirmation_code: {
      placeholder: 'Enter the code given',
      isRequired: true,
    },
  },
};

// @todo-migration remove cast
I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Your code is on the way. To log in, enter the code we emailed to':
    'Enter this code:',
  'It may take a minute to arrive': 'It will take several minutes to arrive',
});

export default function AuthenticatorWithEmail() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        options: {
          userAttributes: attributes,
          autoSignIn: true,
        },
      });
    },
  };

  return (
    <>
      <View>{authStatus}</View>
      <Authenticator
        formFields={formFields}
        initialState="signUp"
        services={services}
        {...getAuthenticatorConfig(awsExports)}
      >
        {({ signOut, user }) => {
          return (
            <main>
              <h1>Hello {user.username}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          );
        }}
      </Authenticator>
    </>
  );
}
