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
        path="guest/this-image-does-not-exist.jpeg"
        onLoad={onLoad}
        onGetUrlError={(error) => {
          console.log('onGetUrlError');
          console.log(error);
        }}
        onError={(error) => {
          console.log('onError');
          console.log(error);
        }}
        fallbackSrc="https://placekitten.com/g/200/300"
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
