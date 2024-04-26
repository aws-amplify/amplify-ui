import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function ProtectedStorageImageExample() {
  return (
    <StorageImage
      alt="protected cat"
      path={({ identityId }) => `protected/${identityId}/cat.jpg`}
    />
  );
}
export default withAuthenticator(ProtectedStorageImageExample);
