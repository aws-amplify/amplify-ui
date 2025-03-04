import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';

export function ComposedDeleteView({ onExit }: { onExit: () => void }) {
  const state = useView('Delete');

  return (
    <StorageBrowser.DeleteView.Provider {...state} onActionExit={onExit}>
      <StorageBrowser.DeleteView.Exit />
      <StorageBrowser.DeleteView.TasksTable />
      <StorageBrowser.DeleteView.Start />
      <StorageBrowser.DeleteView.Message />
    </StorageBrowser.DeleteView.Provider>
  );
}
