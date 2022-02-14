import { RatingProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { RatingPropControlsProps } from './RatingPropControls';

interface UseRatingProps {
  (initialValues: RatingProps): RatingPropControlsProps;
}

export const useRatingProps: UseRatingProps = (initialValues) => {
  const [value, setValue] = React.useState<RatingProps['value']>(
    initialValues.value
  );
  const [maxValue, setMaxValue] = React.useState<RatingProps['maxValue']>(
    initialValues.maxValue
  );
  const [size, setSize] = React.useState<RatingProps['size']>(
    initialValues.size
  );
  const [fillColor, setFillColor] = React.useState<RatingProps['fillColor']>(
    initialValues.fillColor
  );
  const [emptyColor, setEmptyColor] = React.useState<RatingProps['emptyColor']>(
    initialValues.emptyColor
  );

  return {
    value,
    setValue,
    maxValue,
    setMaxValue,
    size,
    setSize,
    fillColor,
    setFillColor,
    emptyColor,
    setEmptyColor,
  };
};
