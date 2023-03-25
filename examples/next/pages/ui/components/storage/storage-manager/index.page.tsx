import { Amplify, Storage } from 'aws-amplify';
import { StorageManager, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export function StorageManagerEmail() {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="private"
      maxFileCount={3}
      isResumable
      showThumbnails={true}
    />
  );
}
export default withAuthenticator(StorageManagerEmail);
