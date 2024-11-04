import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Button,
  Card,
  ThemeProvider,
  View,
  createTheme,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles/reset.css';
import '@aws-amplify/ui-react-storage/styles.css';
import '@aws-amplify/ui-react-storage/storage-browser-styles.css';

import config from './aws-exports';

Amplify.configure(config);

const defaultPrefixes = [
  'public/',
  // intentionally added to test a prefix that should return 403 forbidden
  'forbidden/',
  (identityId: string) => `protected/${identityId}/`,
  (identityId: string) => `private/${identityId}/`,
];

const theme = createTheme({
  name: 'my-theme',
  tokens: {
    colors: {
      font: {
        error: 'hotpink',
      },
    },
  },
});

function Example() {
  return (
    <ThemeProvider theme={theme}>
      <View padding="xl">
        <Button
          marginBlockEnd="medium"
          size="small"
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </Button>
        <Card width="100%" height="700px" variation="outlined">
          <StorageBrowser defaultPrefixes={defaultPrefixes} />
        </Card>
      </View>
    </ThemeProvider>
  );
}

export default withAuthenticator(Example);
