import { Amplify } from 'aws-amplify';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/storage/file-uploader/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export function StorageManagerExample() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="guest"
      maxFileCount={3}
      isResumable
      showThumbnails
    />
  );
}
export default StorageManagerExample;
