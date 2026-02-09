import { Amplify } from 'aws-amplify';
import { signUp, SignUpInput } from 'aws-amplify/auth';
import { I18n } from 'aws-amplify/utils';

import {
  Authenticator,
  translations,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';

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

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Your code is on the way. To log in, enter the code we emailed to':
    'Enter this code:',
  'It may take a minute to arrive': 'It will take several minutes to arrive',
});

function AuthenticatorWithEmail() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const services = {
    async handleSignUp(input: SignUpInput) {
      // custom username and email
      const customUsername = input.username.toLowerCase();
      const customEmail = input.options?.userAttributes?.email.toLowerCase();
      return signUp({
        ...input,
        username: customUsername,
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
    <>
      <View>{authStatus}</View>
      <Authenticator
        formFields={formFields}
        initialState="signUp"
        services={services}
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

export default function ProviderWrappedApp() {
  return (
    <Authenticator.Provider>
      <AuthenticatorWithEmail />
    </Authenticator.Provider>
  );
}
