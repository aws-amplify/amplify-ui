import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig'; // IGNORE

const { StorageBrowser, useView } = createStorageBrowser({
  //...
  config: mockConfig, // IGNORE
});

function CreateFolderView() {
  const state = useView('CreateFolder');

  return (
    <StorageBrowser.CreateFolderView.Provider {...state}>
      <StorageBrowser.CreateFolderView.Exit />
      <StorageBrowser.CreateFolderView.NameField />
      <StorageBrowser.CreateFolderView.Start />
      <StorageBrowser.CreateFolderView.Message />
    </StorageBrowser.CreateFolderView.Provider>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <CreateFolderView />
    </StorageBrowser.Provider>
  );
}
