'use client';

import { StorageBrowser } from './storage-browser-with-validation'; // IGNORE

export default function App() {
  return (
    <StorageBrowser
      displayText={{
        UploadView: {
          getFilesValidationMessage: (data) => {
            const invalidFileNames = data?.invalidFiles?.map(
              ({ file }) => file.name
            );
            return {
              content: `Only image files (PNG/JPEG/GIF) that are 1 MB or smaller are accepted. Invalid files added to the upload queue: ${invalidFileNames}`,
              type: 'error',
            };
          },
        },
      }}
    />
  );
}
