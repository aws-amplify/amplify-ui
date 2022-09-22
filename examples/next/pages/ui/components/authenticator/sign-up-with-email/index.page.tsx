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
      labelHidden: false,
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
  'It may take a minute to arrive.': 'It will take several minutes to arrive.',
});

export default function AuthenticatorWithEmail() {
  const { authStatus, route } = useAuthenticator((context) => [
    context.authStatus,
    context.route,
  ]);
  const services = {
    async handleSignUp(formData, signUp) {
      let { username, password, attributes } = formData;
      // custom username
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase();
      return Auth.signUp({
        username,
        password,
        attributes,
      });
    },
  };

  return (
    <>
      <View>{authStatus}</View>
      <View>{route}</View>
      <Authenticator formFields={formFields} initialState="signUp">
        {({ signOut }) => <button onClick={signOut}>Sign out</button>}
      </Authenticator>
    </>
  );
}
