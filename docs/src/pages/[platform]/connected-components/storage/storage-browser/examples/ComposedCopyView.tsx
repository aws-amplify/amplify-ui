import * as React from 'react';
import { createStorageBrowser } from '@aws-amplify/ui-react-storage/browser';
import { mockConfig } from './mockConfig'; // IGNORE

const { StorageBrowser, useView } = createStorageBrowser({
  //...
  config: mockConfig, // IGNORE
});

function CopyView() {
  const state = useView('Copy');

  return (
    <StorageBrowser.CopyView.Provider {...state}>
      <StorageBrowser.CopyView.Exit />
      <StorageBrowser.CopyView.TasksTable />
      <StorageBrowser.CopyView.Destination />
      <StorageBrowser.CopyView.FoldersSearch />
      <StorageBrowser.CopyView.FoldersTable />
      <StorageBrowser.CopyView.Start />
      <StorageBrowser.CopyView.Message />
    </StorageBrowser.CopyView.Provider>
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
