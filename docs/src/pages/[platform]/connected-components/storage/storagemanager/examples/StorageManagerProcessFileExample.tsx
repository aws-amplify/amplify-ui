import { StorageManager } from '@aws-amplify/ui-react'; // IGNORE
export const StorageManagerProcessFileExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={10}
      processFile={({ file, name }) => {
        const ext = name.split('.').pop();
        return {
          file,
          name: `${Date.now()}.${ext}`,
        };
      }}
      onUploadSuccess={({ key }) => {
        console.log(key);
      }}
      provider="fast" // IGNORE
    />
  );
};
