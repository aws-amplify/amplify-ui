import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import {
  Button,
  Flex,
  Text,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function UploadView() {
  const state = useView('Upload');

  return (
    <>
      <Button
        onClick={() => {
          state.onSelectFiles('FILE');
        }}
      >
        Add files
      </Button>
      {state.tasks.map((task) => {
        return (
          <View key={task.data.key}>
            <Text>{task.data.key}</Text>
            <Text>{task.progress}</Text>
          </View>
        );
      })}
    </>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <UploadView />
    </StorageBrowser.Provider>
  );
}
