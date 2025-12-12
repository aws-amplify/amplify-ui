import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Loader, Text } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';

import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

export function StorageImageExample() {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const onLoad = () => {
    setIsLoaded(true);
    setErrorText('');
  };

  return (
    <>
      <StorageImage
        alt="error cat"
        path="guest/this-image-does-not-exist.jpeg"
        onLoad={onLoad}
        onGetUrlError={(error) => {
          setErrorText(`Error getting image: ${error.message}`);
        }}
        fallbackSrc="https://placekitten.com/g/200/300"
      />
      {isLoaded ? (
        <Text>The image is loaded.</Text>
      ) : (
        <Loader testId="Loader" />
      )}
      <Text>{errorText}</Text>
    </>
  );
}
export default StorageImageExample;
