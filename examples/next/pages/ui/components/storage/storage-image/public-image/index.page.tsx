import * as React from 'react';

import { Amplify } from 'aws-amplify';
import { Loader, Text } from '@aws-amplify/ui-react';
import { StorageImage } from '@aws-amplify/ui-react-storage';
import amplifyOutputs from './amplify_outputs';

Amplify.configure(amplifyOutputs);

export function StorageImageExample() {
  const [isFirstImgLoaded, setIsFirstImgLoaded] = React.useState(false);
  const [isSecondImgLoaded, setIsSecondImgLoaded] = React.useState(false);

  return (
    <>
      <StorageImage
        alt="public cat 1"
        path="public/public-e2e.jpeg"
        onLoad={() => setIsFirstImgLoaded(true)}
      />
      {isFirstImgLoaded ? (
        <Text>The first public image is loaded.</Text>
      ) : (
        <Loader testId="Loader1" />
      )}
      <StorageImage
        alt="public cat 2"
        path={() => 'public/public-e2e.jpeg'}
        onLoad={() => setIsSecondImgLoaded(true)}
      />
      {isSecondImgLoaded ? (
        <Text>The second public image is loaded.</Text>
      ) : (
        <Loader testId="Loader2" />
      )}
    </>
  );
}
export default StorageImageExample;
