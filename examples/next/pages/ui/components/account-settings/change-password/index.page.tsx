import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  ChangePassword,
  Button,
  Card,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function AuthenticatorWithEmail() {
  return (
    <>
      <Authenticator>
        {({ signOut }) => (
          <>
            <Card
              backgroundColor="white"
              width="500px"
              margin="xxl"
              variation="elevated"
            >
              <ChangePassword onSuccess={() => alert('success!')} />
            </Card>
            <Button onClick={signOut}>Sign Out</Button>
          </>
        )}
      </Authenticator>
    </>
  );
}
