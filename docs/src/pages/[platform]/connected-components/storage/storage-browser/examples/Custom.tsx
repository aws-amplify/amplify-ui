import * as React from 'react';
import { StorageBrowser, useView } from './StorageBrowser';
import { CustomCopyView } from './CustomCopyView';
import { CustomCreateFolderView } from './CustomCreateFolderView';
import { CustomDeleteView } from './CustomDeleteView';
import { CustomDownloadView } from './CustomDownloadView';
import { CustomLocationsView } from './CustomLocationsView';
import { CustomUploadView } from './CustomUploadView';
import CustomLocationDetailView from './CustomLocationDetailView';

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
    case 'download':
      return <CustomDownloadView onExit={onExit} />;
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

  return <CustomLocationDetailView />;
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
