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

export function App() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
