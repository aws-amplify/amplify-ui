import { AmplifyAuthenticator, translations } from '@aws-amplify/ui-react';
import awsExports from '@environments/auth-with-email/src/aws-exports';
import { Amplify, I18n } from 'aws-amplify';

Amplify.configure(awsExports);

I18n.putVocabularies(translations);

export default function AuthenticatorWithUsername() {
  return (
    <AmplifyAuthenticator usernameAlias="email">
      <h1>Welcome!</h1>
    </AmplifyAuthenticator>
  );
}
