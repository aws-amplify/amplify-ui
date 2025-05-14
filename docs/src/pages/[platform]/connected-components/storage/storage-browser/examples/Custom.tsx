import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';
import { CustomDeleteView } from './CustomDeleteView';
import { CustomCopyView } from './CustomCopyView';
import { CustomCreateFolderView } from './CustomCreateFolderView';
import { CustomUploadView } from './CustomUploadView';
import { CustomLocationsView } from './CustomLocationsView';

function MyLocationActionView() {
  const state = useView('LocationDetail');
  const onExit = () => {
    state.onActionSelect('');
  };

  switch (state.actionType) {
    case 'copy':
      return <CustomCopyView onExit={onExit} />;
    case 'createFolder':
      return <CustomCreateFolderView onExit={onExit} />;
    case 'delete':
      return <CustomDeleteView onExit={onExit} />;
    case 'upload':
      return <CustomUploadView onExit={onExit} />;
    default:
      return null;
  }
}

function MyStorageBrowser() {
  const state = useView('LocationDetail');

  if (!state.location.current) {
    return <CustomLocationsView />;
  }

  if (state.actionType) {
    return <MyLocationActionView />;
  }

  return <StorageBrowser.LocationDetailView />;
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
