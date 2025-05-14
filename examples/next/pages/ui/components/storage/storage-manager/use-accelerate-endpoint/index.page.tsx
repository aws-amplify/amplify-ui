import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

const processFile = ({ file, key }) => {
  return {
    file,
    key,
    useAccelerateEndpoint: file.size > 10000 ? true : false,
  };
};

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={10}
      showThumbnails
      autoUpload={false}
      useAccelerateEndpoint
      processFile={processFile}
    />
  );
}
export default StorageManagerExample;
