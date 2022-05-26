import * as React from 'react';

import { Loader, LoaderProps } from '@aws-amplify/ui-react';

import { LoaderPropControlsProps } from './LoaderPropControls';
import { demoState } from '@/utils/demoState';

interface UseLoaderProps {
  (initialValues: LoaderProps): LoaderPropControlsProps;
}

export const useLoaderProps: UseLoaderProps = (initialValues) => {
  const [size, setSize] = React.useState<LoaderProps['size']>(
    initialValues.size
  );
  const [variation, setVariation] = React.useState<LoaderProps['variation']>(
    initialValues.variation
  );
  const [emptyColor, setEmptyColor] = React.useState<LoaderProps['emptyColor']>(
    initialValues.emptyColor
  );
  const [filledColor, setFilledColor] = React.useState<
    LoaderProps['filledColor']
  >(initialValues.filledColor);
  const [isDeterminate, setIsDeterminate] = React.useState<
    LoaderProps['isDeterminate']
  >(initialValues.isDeterminate);
  const [percentage, setPercentage] = React.useState<LoaderProps['percentage']>(
    initialValues.percentage
  );
  const [isPercentageTextHidden, setIsPercentageTextHidden] = React.useState<
    LoaderProps['isPercentageTextHidden']
  >(initialValues.isPercentageTextHidden);

  React.useEffect(() => {
    demoState.set(Loader.displayName, {
      size,
      variation,
      emptyColor,
      filledColor,
      isDeterminate,
      percentage,
      isPercentageTextHidden,
    });
  }, [
    size,
    variation,
    emptyColor,
    filledColor,
    isDeterminate,
    percentage,
    isPercentageTextHidden,
  ]);

  return React.useMemo(
    () => ({
      size,
      setSize,
      variation,
      setVariation,
      emptyColor,
      setEmptyColor,
      filledColor,
      setFilledColor,
      isDeterminate,
      setIsDeterminate,
      percentage,
      setPercentage,
      isPercentageTextHidden,
      setIsPercentageTextHidden,
    }),
    [
      size,
      setSize,
      variation,
      setVariation,
      emptyColor,
      setEmptyColor,
      filledColor,
      setFilledColor,
      isDeterminate,
      setIsDeterminate,
      percentage,
      setPercentage,
      isPercentageTextHidden,
      setIsPercentageTextHidden,
    ]
  );
};
