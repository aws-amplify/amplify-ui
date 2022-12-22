import { Amplify, Auth, I18n } from 'aws-amplify';

import {
  Authenticator,
  translations,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
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
        attributes,
        autoSignIn: {
          enabled: true,
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
        {({ signOut }) => <button onClick={signOut}>Sign out</button>}
      </Authenticator>
    </>
  );
}
