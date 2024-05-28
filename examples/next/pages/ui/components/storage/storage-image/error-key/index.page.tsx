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
