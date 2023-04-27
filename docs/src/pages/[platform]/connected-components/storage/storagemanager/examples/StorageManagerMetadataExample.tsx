import { StorageManager } from '@aws-amplify/ui-react-storage';

const processFile = ({ file, key, metadata }) => {
  return {
    file,
    key,
    metadata: {
      ...metadata,
      id: key,
    },
  };
};

export function StorageManagerMetadataExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      maxFileCount={3}
      showThumbnails={true}
      metadata={{
        test: 'bar',
      }}
      processFile={processFile}
    />
  );
}
