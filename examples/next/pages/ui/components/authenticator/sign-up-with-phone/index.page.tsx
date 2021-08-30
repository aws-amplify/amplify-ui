import { Authenticator } from '@aws-amplify/ui-react';
import { dict } from '@aws-amplify/ui';
import { Amplify, I18n } from 'aws-amplify';
import awsExports from '@environments/auth-with-phone-number/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['phone_number'],
  },
});

I18n.putVocabularies(dict);

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
