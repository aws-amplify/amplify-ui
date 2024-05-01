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
        path={({ identityId }) => `private/${identityId}/`}
        maxFileCount={3}
        isResumable
        showThumbnails
      />
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
export default withAuthenticator(StorageManagerExample);
