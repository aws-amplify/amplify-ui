import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      path="public/"
      maxFileCount={1}
      showThumbnails
      defaultFiles={[{ key: 'default.jpg' }]}
    />
  );
}
export default StorageManagerExample;
