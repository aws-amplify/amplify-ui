import React from 'react';
import { Amplify } from 'aws-amplify';
import { signOut } from 'aws-amplify/auth';

import { Button, Flex, View, withAuthenticator } from '@aws-amplify/ui-react';
import {
  createAmplifyAuthAdapter,
  createStorageBrowser,
} from '@aws-amplify/ui-react-storage/browser';

import '@aws-amplify/ui-react-storage/styles.css';

import config from './aws-exports';

Amplify.configure(config);

const { StorageBrowser, useView } = createStorageBrowser({
  config: createAmplifyAuthAdapter(),
});

const UploadView = () => {
  const props = useView('Upload');

  const handleFileSelect = (type) => {
    // eslint-disable-next-line no-console
    console.log('whatever');

    props.onSelectFiles(type);
  };

  return (
    <StorageBrowser.UploadView
      {...props}
      acceptedFileTypes={['.jpeg']}
      onSelectFiles={handleFileSelect}
    />
  );
};

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
        <StorageBrowser
          displayText={{
            LocationsView: { title: 'Home - Validate File Type' },
          }}
          views={{ UploadView }}
        />
      </View>
    </Flex>
  );
}

export default withAuthenticator(Example);
