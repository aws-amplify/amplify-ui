import * as React from 'react';
import { Placeholder, PlaceholderProps } from '@aws-amplify/ui-react';

import { PlaceholderPropControlsProps } from './PlaceholderControls';
import { demoState } from '@/utils/demoState';

interface UsePlaceholderProps {
  (initialValues: PlaceholderProps): PlaceholderPropControlsProps;
}

export const usePlaceholderProps: UsePlaceholderProps = (initialValues) => {
  const [startColor, setStartColor] = React.useState<
    PlaceholderProps['startColor']
  >(initialValues.startColor);
  const [endColor, setEndColor] = React.useState<PlaceholderProps['endColor']>(
    initialValues.endColor
  );
  const [size, setSize] = React.useState<PlaceholderProps['size']>(
    initialValues.size
  );
  const [isLoaded, setIsLoaded] = React.useState<PlaceholderProps['isLoaded']>(
    initialValues.isLoaded
  );

  React.useEffect(() => {
    demoState.set(Placeholder.displayName, {
      startColor,
      endColor,
      size,
      isLoaded,
    });
  }, [startColor, endColor, size, isLoaded]);

  return React.useMemo(
    () => ({
      startColor,
      setStartColor,
      endColor,
      setEndColor,
      size,
      setSize,
      isLoaded,
      setIsLoaded,
    }),
    [
      startColor,
      setStartColor,
      endColor,
      setEndColor,
      size,
      setSize,
      isLoaded,
      setIsLoaded,
    ]
  );
};
