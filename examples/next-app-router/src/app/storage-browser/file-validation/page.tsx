'use client';

import { StorageBrowser } from './storage-browser-with-validation'; // IGNORE

import type { StorageBrowserDisplayText } from '@aws-amplify/ui-react-storage/browser';

export default function App() {
  const CUSTOM_UPLOAD_DISPLAY_TEXT: StorageBrowserDisplayText = {
    UploadView: {
      getFilesValidationMessage: (data) => {
        const invalidFileNames = data?.invalidFiles?.map(
          ({ file }) => file.name
        );
        return {
          content: `Only image files (PNG/JPEG/GIF) below 1 MB in size are accepted. Invalid files added to the upload queue: ${invalidFileNames}`,
          type: 'error',
        };
      },
    },
  };

  return <StorageBrowser displayText={CUSTOM_UPLOAD_DISPLAY_TEXT} />;
}
