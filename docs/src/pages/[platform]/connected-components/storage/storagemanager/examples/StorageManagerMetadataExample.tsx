import { StorageManager } from '@aws-amplify/ui-react-storage';

const processFile = ({ file, key }) => {
  return {
    file,
    key,
    metadata: {
      id: key,
    },
  };
};

export function StorageManagerMetadataExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="guest"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
