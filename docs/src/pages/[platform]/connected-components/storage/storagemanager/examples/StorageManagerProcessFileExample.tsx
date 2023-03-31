import { StorageManager } from '@aws-amplify/ui-react-storage'; // IGNORE
export const StorageManagerProcessFileExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={10}
      processFile={({ file, key }) => {
        const ext = key.split('.').pop();
        return {
          file,
          key: `${Date.now()}.${ext}`,
        };
      }}
      onUploadSuccess={({ key }) => {
        console.log(key);
      }}
      provider="fast" // IGNORE
    />
  );
};
