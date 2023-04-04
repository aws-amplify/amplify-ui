import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerFileTypesExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={[
        // you can list file extensions:
        '.gif',
        '.bmp',
        '.doc',
        '.jpeg',
        '.jpg',
        // or MIME types:
        'image/png',
        'video/*',
      ]}
      accessLevel="public"
      maxFileCount={5}
      // Size is in bytes
      maxFileSize={10000}
      // @ts-ignore // IGNORE
      provider="fast" // IGNORE
    />
  );
};
