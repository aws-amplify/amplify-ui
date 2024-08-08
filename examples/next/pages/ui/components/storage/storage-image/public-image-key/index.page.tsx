import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Text, Loader } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';

const amplifyOutputs = (
  await import(`@environments/storage/file-uploader/${process.env.PATH}`)
).default;

Amplify.configure(amplifyOutputs);

export function StorageImageExample() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <StorageImage
        alt="public cat"
        imgKey="public-e2e.jpeg"
        accessLevel="guest"
        onLoad={onLoad}
      />
      {isLoaded ? (
        <Text>The public image is loaded.</Text>
      ) : (
        <Loader testId="Loader" />
      )}
    </>
  );
}
export default StorageImageExample;
