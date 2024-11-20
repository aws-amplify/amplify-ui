import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import {
  Button,
  Flex,
  IconsProvider,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import {
  ActionConfig,
  ActionHandler,
} from '@aws-amplify/ui-react-storage/browser';

import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

Amplify.configure(config);

const IndeterminateIcon = () => (
  <View as="span" className="amplify-icon" width="1em" height="1em">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      width="24"
      viewBox="0 0 24 24"
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  </View>
);

function Example() {
  return (
    <Flex
      direction="column"
      width="100vw"
      height="100vh"
      overflow="hidden"
      padding="xl"
    >
      <Button
        marginBlockEnd="xl"
        alignSelf="flex-start"
        size="small"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </Button>
      <View flex="1" overflow="hidden">
        <IconsProvider
          icons={{
            storageBrowser: { 'sort-indeterminate': <IndeterminateIcon /> },
          }}
        >
          <StorageBrowser
            displayText={{ LocationsView: { title: 'Home - Amplify Auth' } }}
          />
        </IconsProvider>
      </View>
    </Flex>
  );
}

export default withAuthenticator(Example);
