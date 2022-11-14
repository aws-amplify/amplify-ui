import { Amplify } from 'aws-amplify';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { DeleteUser } from '@aws-amplify/ui-react';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <Card width="800px">
          <Flex direction="column">
            <Card variation="outlined">
              <Heading>Setup MFA:</Heading>
              <DeleteUser />
            </Card>
            <Button onClick={signOut}>Sign Out</Button>
          </Flex>
        </Card>
      )}
    </Authenticator>
  );
}
