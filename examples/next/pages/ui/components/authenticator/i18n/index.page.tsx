import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure(awsExports);

I18n.setLanguage('fr');

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}

export default withAuthenticator(App);
