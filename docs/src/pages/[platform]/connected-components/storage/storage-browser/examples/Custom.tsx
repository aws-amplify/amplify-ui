import * as React from 'react';
import { StorageBrowser, useView } from './MockStorageBrowser';
import { CustomDeleteView } from './CustomDeleteView';
import { CustomCopyView } from './CustomCopyView';
import { CustomCreateFolderView } from './CustomCreateFolderView';
import { CustomUploadView } from './CustomUploadView';
import { CustomLocationsView } from './CustomLocationsView';

function MyLocationActionView({
  type,
  onExit,
}: {
  type?: string;
  onExit: () => void;
}) {
  let DialogContent = null;
  if (!type) return DialogContent;

  switch (type) {
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
  const [currentAction, setCurrentAction] = React.useState<string>();

  if (!state.location.current) {
    return <CustomLocationsView />;
  }

  if (currentAction) {
    return (
      <MyLocationActionView
        type={currentAction}
        onExit={() => {
          setCurrentAction(undefined);
        }}
      />
    );
  }

  return (
    <StorageBrowser.LocationDetailView
      key={currentAction}
      onActionSelect={(action) => {
        setCurrentAction(action);
      }}
    />
  );
}

export default function Example() {
  return (
    <StorageBrowser.Provider>
      <MyStorageBrowser />
    </StorageBrowser.Provider>
  );
}
