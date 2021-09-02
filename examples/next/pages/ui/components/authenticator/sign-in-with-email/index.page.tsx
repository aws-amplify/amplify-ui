import { Authenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-email/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

I18n.putVocabularies(translations);

export default function AuthenticatorWithEmail() {
  return (
    <>
      <Authenticator>
        {({ send }) => {
          return (
            <>
              <button onClick={() => send('SIGN_OUT')}>Sign out</button>
            </>
          );
        }}
      </Authenticator>
    </>
  );
}
