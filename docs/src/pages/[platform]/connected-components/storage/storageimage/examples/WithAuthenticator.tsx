import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export const App = () => {
  return (
    <StorageImage
      alt="sleepy-cat"
      path={({ identityId }) => `private/${identityId}/cat.jpeg`}
    />
  );
};

export default withAuthenticator(App);
