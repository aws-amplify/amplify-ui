import * as React from 'react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import { useView } from './MockStorageBrowser';

export function CustomCopyView({ onExit }: { onExit: () => void }) {
  const state = useView('Copy');

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
        Copy {state.tasks.length} files
      </Button>
    </Flex>
  );
}
