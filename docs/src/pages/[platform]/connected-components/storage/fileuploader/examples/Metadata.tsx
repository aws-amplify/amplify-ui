import { FileUploader } from '@aws-amplify/ui-react-storage';

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
    <FileUploader
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={3}
      showThumbnails={true}
      processFile={processFile}
    />
  );
}
