import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { Button, Flex, withAuthenticator } from '@aws-amplify/ui-react';
import { StorageBrowser } from '@aws-amplify/ui-react-storage';
import config from './aws-exports';

import '@aws-amplify/ui-react-storage/styles.css';
import { parseAmplifyConfig } from 'aws-amplify/utils';

const amplifyConfig = parseAmplifyConfig(config);

const bucketInAnotherRegionOne = {
  name: 'MultiRegionOneForStorageBrowser',
  bucketName: 'multi-region-1-for-storage-browser',
  region: 'eu-central-1',
  paths: {
    'multi-region-folder-do-not-delete/*': {
      guest: ['get', 'list', 'write'],
      authenticated: ['get', 'list', 'write', 'delete'],
    },
  },
};

const bucketInAnotherRegionTwo = {
  name: 'MultiRegionTwoForStorageBrowser',
  bucketName: 'multi-region-2-for-storage-browser',
  region: 'ap-northeast-3',
  paths: {
    'another-multi-region-folder-do-not-delete/*': {
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
        [bucketInAnotherRegionTwo.name]: bucketInAnotherRegionTwo,
        [bucketInAnotherRegionOne.name]: bucketInAnotherRegionOne,
      },
    },
  },
});

function MultiRegionReproduction() {
  return (
    <Flex direction="column" width="100vw" height="100vh" padding="xl">
      <Button
        marginBlockEnd="xl"
        alignSelf="flex-start"
        size="small"
        onClick={() => signOut()}
      >
        Sign Out
      </Button>

      <StorageBrowser
        displayText={{
          LocationsView: {
            title: 'This StorageBrowser uses Multi-Region buckets',
          },
        }}
      />
    </Flex>
  );
}

export default withAuthenticator(MultiRegionReproduction);
