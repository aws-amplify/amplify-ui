import { IconsProvider, View } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';
import { Button, Flex, withAuthenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react-storage/styles.css';
import { parseAmplifyConfig } from 'aws-amplify/utils';

const amplifyConfig = parseAmplifyConfig(config);

const bucketInAnotherRegionOne = {
  name: 'LockedRegionForStorageBrowser',
  bucketName: 'folder-deletion-with-object-locks',
  region: 'us-east-1',
  paths: {
    'this-folder-has-locked-items/*': {
      guest: ['get', 'list', 'write'],
      authenticated: ['get', 'list', 'write', 'delete'],
    },
  },
};

Amplify.configure({
  ...amplifyConfig,
  Storage: {
    ...amplifyConfig.Storage,
    S3: {
      ...amplifyConfig.Storage.S3,
      buckets: {
        ...amplifyConfig.Storage.S3?.buckets,
        [bucketInAnotherRegionOne.name]: bucketInAnotherRegionOne,
      },
    },
  },
});

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
