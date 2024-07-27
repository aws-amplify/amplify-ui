import React from 'react';

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  createStorageBrowser,
  CreateStorageBrowserInput,
} from '@aws-amplify/ui-react-storage';

import { Flex } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react-storage/storage-browser-styles.css';
import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';
Amplify.configure(config);

// TEMPORARY
const listLocations: CreateStorageBrowserInput['config']['listLocations'] =
  async () => {
    const { bucket } = Amplify.getConfig()?.Storage?.S3;

    return await Promise.resolve({
      locations: [{ type: 'BUCKET', permission: 'READ', scope: bucket }],
      nextToken: undefined,
    } as { locations: any[]; nextToken: string | undefined });
  };

const { StorageBrowser } = createStorageBrowser({
  config: { listLocations },
});

function Example() {
  return (
    <StorageBrowser.Provider>
      <Flex>
        <Flex direction={'column'}>
          <StorageBrowser.LocationsView />
        </Flex>
        <Flex direction={'column'}>
          <StorageBrowser.LocationDetailView />
        </Flex>
      </Flex>
    </StorageBrowser.Provider>
  );
}

export default withAuthenticator(Example);
