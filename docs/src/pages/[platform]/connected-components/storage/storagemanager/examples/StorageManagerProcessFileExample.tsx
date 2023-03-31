import { StorageManager } from '@aws-amplify/ui-react-storage'; // IGNORE
export const StorageManagerProcessFileExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={10}
      processFile={({ file, key }) => {
        const fileParts = key.split('.');
        const ext = fileParts.pop();
        return {
          file,
          // This will prepend a unix timestamp
          // to ensure all files uploaded are unique
          key: `${Date.now()}${fileParts.join('.')}.${ext}`,
        };
      }}
      onUploadSuccess={({ key }) => {
        console.log(key);
      }}
      provider="fast" // IGNORE
    />
  );
};
