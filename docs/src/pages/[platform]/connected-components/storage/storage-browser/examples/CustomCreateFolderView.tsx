import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, TextField, View } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function CreateFolderView() {
  const state = useView('CreateFolder');

  return (
    <Flex
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          state.onActionStart();
        } catch (error) {
          console.log(error);
        }
      }}
      direction="column"
    >
      <TextField
        label=""
        value={state.folderName}
        onChange={(e) => {
          state.onFolderNameChange(e.target.value);
        }}
        outerEndComponent={<Button type="submit">Start</Button>}
      />
    </Flex>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <CreateFolderView />
    </StorageBrowser.Provider>
  );
}
