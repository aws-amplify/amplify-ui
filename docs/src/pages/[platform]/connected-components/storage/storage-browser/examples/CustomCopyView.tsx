import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function CopyView() {
  const state = useView('Copy');

  return (
    <>
      {state.tasks.map((task) => {
        <Flex key={task.data.key} direction="row">
          <Text>{task.data.key}</Text>
        </Flex>;
      })}
      <Button onClick={state.onActionStart}>
        Copy {state.tasks.length} files
      </Button>
    </>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider
      location={{
        bucket: 'test',
        prefix: '/foo',
        id: '1234',
        type: 'PREFIX',
        permissions: ['write', 'list', 'get', 'delete'],
      }}
    >
      <CopyView />
    </StorageBrowser.Provider>
  );
}
