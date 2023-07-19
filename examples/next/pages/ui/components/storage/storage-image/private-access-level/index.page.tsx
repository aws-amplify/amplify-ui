import * as React from 'react';

import { Amplify } from 'aws-amplify';
import {
  Button,
  Text,
  Loader,
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function StorageImageExample() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <StorageImage
        alt="private cat"
        imgKey="private-e2e.jpeg"
        accessLevel="private"
        onLoad={onLoad}
      />
      {isLoaded ? (
        <Text>The private image is loaded.</Text>
      ) : (
        <Loader testId="Loader" />
      )}
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
export default withAuthenticator(StorageImageExample);
