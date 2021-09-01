import { Authenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-totp-and-sms-mfa/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure({
  ...awsExports,
  auth: {
    login_mechanisms: ['email'],
  },
});

I18n.putVocabularies(translations);

export default function SignInTotpSmsMfa() {
  return <Authenticator />;
}
