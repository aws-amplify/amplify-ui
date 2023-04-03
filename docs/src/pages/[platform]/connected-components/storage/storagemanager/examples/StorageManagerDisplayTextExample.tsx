import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerDisplayTextExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={1}
      displayText={{
        // some text are plain strings
        dropFilesText: 'drag-and-drop here',
        browseFilesText: 'Open file picker',
        // others are functions that take an argument
        getFilesUploadedText(count) {
          return `${count} images uploaded`;
        },
      }}
      provider="fast" // IGNORE
    />
  );
};
