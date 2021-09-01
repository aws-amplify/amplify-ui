import { Authenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-username-no-attributes/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure(awsExports);
I18n.putVocabularies(translations);

export default function AuthenticatorWithUsername() {
  return <Authenticator />;
}
