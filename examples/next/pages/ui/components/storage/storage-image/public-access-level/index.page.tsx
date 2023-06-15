import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Text } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export function StorageImageExample() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <StorageImage
        alt="This is a test image."
        imgKey="notacat.png"
        accessLevel="public"
        onLoad={onLoad}
      />
      {isLoaded ? (
        <Text>The image is loaded.</Text>
      ) : (
        <Text>The image is loading.</Text>
      )}
    </>
  );
}
export default StorageImageExample;
