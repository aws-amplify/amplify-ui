import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';

export function ComposedDownloadView({ onExit }: { onExit: () => void }) {
  const state = useView('Download');

  return (
    <StorageBrowser.DownloadView.Provider {...state} onActionExit={onExit}>
      <StorageBrowser.DownloadView.Exit />
      <StorageBrowser.DownloadView.TasksTable />
      <StorageBrowser.DownloadView.Start />
      <StorageBrowser.DownloadView.Message />
    </StorageBrowser.DownloadView.Provider>
  );
}
