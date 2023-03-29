import { StorageManager } from '@aws-amplify/ui-react'; // IGNORE
export const StorageManagerDisplayTextExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={1}
      displayText={{
        dropFilesText: 'drop filez here',
        getFilesUploadedText(count) {
          return `${count} filez uploaded`;
        },
      }}
      provider="fast" // IGNORE
    />
  );
};
