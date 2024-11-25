import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, Text, TextField, View } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function DeleteView() {
  const state = useView('Delete');

  return (
    <>
      {state.tasks.map((task) => {
        <Flex key={task.data.key} direction="row">
          <Text>{task.data.key}</Text>
        </Flex>;
      })}
      <Button onClick={state.onActionStart}>
        Delete {state.tasks.length} files
      </Button>
    </>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <DeleteView />
    </StorageBrowser.Provider>
  );
}
