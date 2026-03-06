import * as React from 'react';
import { StorageBrowser } from './StorageBrowser';

export default function Example() {
  return (
    <StorageBrowser
      displayText={{
        LocationsView: {
          // Some display texts are a string
          title: 'Select a location',
          // Some are a function that return a string
          getPermissionName: (permissions) => permissions.join('/'),
        },
        LocationDetailView: {
          searchSubfoldersToggleLabel: 'Search subfolders',
          filePreview: {
            filePreviewTitle: 'File Preview Title',
            closeButtonLabel: 'Close Preview',
          },
        },
      }}
    />
  );
}
