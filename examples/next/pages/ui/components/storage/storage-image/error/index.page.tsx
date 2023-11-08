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
        alt="private cat"
        imgKey="this-image-does-not-exist.jpeg"
        fallbackSrc="https://placekitten.com/g/200/300"
        accessLevel="guest"
        onLoad={onLoad}
        onStorageGetError={(error) => {
          console.log('onStorageGetError');
          console.log(error);
        }}
        onError={(error) => {
          console.log('onError');
          console.log(error);
        }}
      />
      {isLoaded ? (
        <Text>The image is loaded.</Text>
      ) : (
        <Loader testId="Loader" />
      )}
    </>
  );
}
export default StorageImageExample;
