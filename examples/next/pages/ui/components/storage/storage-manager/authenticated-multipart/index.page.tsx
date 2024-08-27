import { Amplify } from 'aws-amplify';
import {
  Button,
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { FileUploader } from '@aws-amplify/ui-react-storage';

import '@aws-amplify/ui-react/styles.css';
import amplifyOutputs from './amplify_outputs';
Amplify.configure(amplifyOutputs);

export function FileUploaderExample() {
  const { signOut } = useAuthenticator((context) => [context.signOut]);
  return (
    <>
      <FileUploader
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
export default withAuthenticator(FileUploaderExample);
