import { Authenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['username'],
  },
});

I18n.putVocabularies(translations);

export default function AuthenticatorWithUsername() {
  return (
    <Authenticator>
      {({ send }) => <button onClick={() => send('SIGN_OUT')}>Sign out</button>}
    </Authenticator>
  );
}
