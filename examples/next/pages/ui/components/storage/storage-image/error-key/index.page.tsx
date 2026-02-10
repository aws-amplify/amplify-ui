import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Loader, Text } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

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
        imgKey="this-image-does-not-exist.jpeg"
        fallbackSrc="https://placekitten.com/g/200/300"
        accessLevel="guest"
        onLoad={onLoad}
        onStorageGetError={(error) => {
          setErrorText(`Error getting image: ${error.message}`);
        }}
      />
      {isLoaded ? (
        <Text>The image is loaded.</Text>
      ) : (
        <Loader testId="Loader" />
      )}
      <Text>{errorText}</Text>
      <StorageImage
        alt="error cat"
        imgKey="this-image-does-not-exist-2.jpeg"
        fallbackSrc="https://placekitten.com/g/200/300"
        accessLevel="guest"
        validateObjectExistence={false}
      />
    </>
  );
}
export default StorageImageExample;
