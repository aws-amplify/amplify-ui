import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig'; // IGNORE

const { StorageBrowser, useView } = createStorageBrowser({
  //...
  config: mockConfig, // IGNORE
});

function DeleteView() {
  const state = useView('Delete');

  return (
    <StorageBrowser.DeleteView.Provider {...state}>
      <StorageBrowser.DeleteView.Exit />
      <StorageBrowser.DeleteView.TasksTable />
      <StorageBrowser.DeleteView.Start />
      <StorageBrowser.DeleteView.Message />
    </StorageBrowser.DeleteView.Provider>
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <DeleteView />
    </StorageBrowser.Provider>
  );
}
