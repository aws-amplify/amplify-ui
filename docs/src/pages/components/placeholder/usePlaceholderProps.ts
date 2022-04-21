import * as React from 'react';
import { PlaceholderProps } from '@aws-amplify/ui-react';

import { PlaceholderPropControlsProps } from './PlaceholderControls';

interface UsePlaceholderProps {
  (initialValues: PlaceholderProps): PlaceholderPropControlsProps;
}

export const usePlaceholderProps: UsePlaceholderProps = (initialValues) => {
  const [size, setSize] = React.useState<PlaceholderProps['size']>(
    initialValues.size
  );
  const [isLoaded, setIsLoaded] = React.useState<PlaceholderProps['isLoaded']>(
    initialValues.isLoaded
  );

  return {
    size,
    setSize,
    isLoaded,
    setIsLoaded,
  };
};
