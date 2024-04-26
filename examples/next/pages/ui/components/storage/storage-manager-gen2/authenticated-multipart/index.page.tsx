import { Amplify } from 'aws-amplify';
import {
  Button,
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react/styles.css';
import amplifyconfig from './aws-exports';
Amplify.configure(amplifyconfig);

export function StorageManagerExample() {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  return (
    <>
      <StorageManager
        acceptedFileTypes={['image/*']}
        prefix="private/us-east-2:6cbbe090-3d63-4c32-a580-2b4f462d4372/"
        maxFileCount={3}
        isResumable
        showThumbnails
      />
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
export default withAuthenticator(StorageManagerExample);
