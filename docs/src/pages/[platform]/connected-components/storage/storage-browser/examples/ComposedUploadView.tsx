import * as React from 'react';
import { Flex } from '@aws-amplify/ui-react';
import { StorageBrowser, useView } from './StorageBrowser';

export function ComposedUploadView({ onExit }: { onExit: () => void }) {
  const state = useView('Upload');

  return (
    <StorageBrowser.UploadView.Provider {...state} onActionExit={onExit}>
      <StorageBrowser.UploadView.Exit />
      <StorageBrowser.UploadView.TasksTable />
      <Flex direction="row" width="100%">
        <StorageBrowser.UploadView.AddFiles />
        <StorageBrowser.UploadView.AddFolder />
        <StorageBrowser.UploadView.Start />
      </Flex>
      <StorageBrowser.UploadView.Message />
    </StorageBrowser.UploadView.Provider>
  );
}
