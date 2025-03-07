import * as React from 'react';
import { Button, Flex, TextField } from '@aws-amplify/ui-react';
import { useView } from './StorageBrowser';

export function CustomCreateFolderView({ onExit }: { onExit: () => void }) {
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
      <Button variation="link" alignSelf="flex-start" onClick={onExit}>
        Exit
      </Button>
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
