import { Authenticator } from 'aws-amplify-react';
import { dict } from '@aws-amplify/ui';
import { Amplify, I18n } from 'aws-amplify';

import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

I18n.putVocabularies(dict);

export default function SignInTotpSmsMfa() {
  return <Authenticator />;
}
