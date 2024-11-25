import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { Button, Flex, View } from '@aws-amplify/ui-react';
import { mockConfig } from './mockConfig';

const { StorageBrowser, useView } = createStorageBrowser({
  config: mockConfig,
});

function UploadView() {
  const state = useView('Upload');

  return (
    <StorageBrowser.UploadView.Provider {...state}>
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

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <UploadView />
    </StorageBrowser.Provider>
  );
}
