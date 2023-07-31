import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Text, Loader } from '@aws-amplify/ui-react';
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
        alt="public cat"
        imgKey="public-e2e.jpeg"
        accessLevel="public"
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
