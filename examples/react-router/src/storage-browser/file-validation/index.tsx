import { StorageBrowser } from './storage-browser-with-validation'; // import first, not included in docs example

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
              content: `Only image files (PNG/JPEG/GIF) below 1 MB in size are accepted. Invalid files added to the upload queue: ${invalidFileNames}`,
              type: 'error',
            };
          },
        },
      }}
    />
  );
}
