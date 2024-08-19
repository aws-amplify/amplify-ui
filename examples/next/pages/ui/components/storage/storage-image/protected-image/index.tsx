import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  Button,
  Text,
  Loader,
  useAuthenticator,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

export function StorageImageExample() {
  const [isFirstImgLoaded, setIsFirstImgLoaded] = React.useState(false);
  const [isSecondImgLoaded, setIsSecondImgLoaded] = React.useState(false);
  const [identityId, setIdentityId] = React.useState<string>();
  const { signOut } = useAuthenticator((context) => [context.signOut]);

  React.useEffect(() => {
    const fetchIdentityId = async () => {
      const { identityId } = await fetchAuthSession();
      console.log(identityId);
      setIdentityId(identityId);
    };

    fetchIdentityId();
  }, []);

  return (
    <>
      <StorageImage
        alt="protected cat 1"
        path={({ identityId }) => `protected/${identityId}/protected-e2e.jpeg`}
        onLoad={() => setIsFirstImgLoaded(true)}
      />
      {isFirstImgLoaded ? (
        <Text>The first protected image is loaded.</Text>
      ) : (
        <Loader testId="Loader1" />
      )}
      {identityId && (
        <StorageImage
          alt="protected cat 2"
          path={`protected/${identityId}/protected-e2e.jpeg`}
          onLoad={() => setIsSecondImgLoaded(true)}
        />
      )}
      {isSecondImgLoaded ? (
        <Text>The second protected image is loaded.</Text>
      ) : (
        <Loader testId="Loader2" />
      )}
      <Button onClick={signOut}>Sign out</Button>
    </>
  );
}
export default withAuthenticator(StorageImageExample);
