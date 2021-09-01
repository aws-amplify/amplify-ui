import { Authenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['phone_number'],
  },
});

I18n.putVocabularies(translations);

export default function AuthenticatorWithPhone() {
  return (
    <>
      <Authenticator>
        {({ send }) => {
          return (
            <>
              <h1>Hello</h1>
              <button onClick={() => send('SIGN_OUT')}>Sign out</button>
            </>
          );
        }}
      </Authenticator>
    </>
  );
}
