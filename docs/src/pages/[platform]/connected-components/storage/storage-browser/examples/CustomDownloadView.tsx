import * as React from 'react';
import { Button, Flex, Text, View } from '@aws-amplify/ui-react';
import { useView } from './StorageBrowser';

export function CustomDownloadView({ onExit }: { onExit: () => void }) {
  const state = useView('Download');

  return (
    <Flex direction="column">
      <Button variation="link" alignSelf="flex-start" onClick={onExit}>
        Exit
      </Button>
      {state.tasks.map((task) => (
        <Flex key={task.data.key} direction="row">
          <Text>{task.data.key}</Text>
        </Flex>
      ))}
      <Button onClick={state.onActionStart}>
        Download {state.tasks.length} files
      </Button>
    </Flex>
  );
}
