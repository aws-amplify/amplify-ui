import * as React from 'react';
import { StorageBrowser, useView } from './MockStorageBrowser';

export function ComposedCreateFolderView({ onExit }: { onExit: () => void }) {
  const state = useView('CreateFolder');

  return (
    <StorageBrowser.CreateFolderView.Provider {...state} onActionExit={onExit}>
      <StorageBrowser.CreateFolderView.Exit />
      <StorageBrowser.CreateFolderView.NameField />
      <StorageBrowser.CreateFolderView.Start />
      <StorageBrowser.CreateFolderView.Message />
    </StorageBrowser.CreateFolderView.Provider>
  );
}
