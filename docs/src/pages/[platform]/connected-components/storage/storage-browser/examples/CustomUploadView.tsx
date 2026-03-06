import * as React from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import { useView } from './StorageBrowser';

export function CustomUploadView({ onExit }: { onExit: () => void }) {
  const state = useView('Upload');

  return (
    <Flex direction="column">
      <Button variation="link" alignSelf="flex-start" onClick={onExit}>
        Exit
      </Button>
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
    </Flex>
  );
}
