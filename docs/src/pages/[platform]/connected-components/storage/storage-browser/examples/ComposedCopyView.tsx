import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';

export function ComposedCopyView({ onExit }: { onExit: () => void }) {
  const state = useView('Copy');

  return (
    <StorageBrowser.CopyView.Provider {...state} onActionExit={onExit}>
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
