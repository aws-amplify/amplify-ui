import React from 'react';
import { Rating } from '@aws-amplify/ui-react';
import { RatingPropControls } from '@/components/RatingPropControls';

export const RatingDemo = ({ children }) => {
  const [fillColor, setFillColor] = React.useState<string>('#ffb400');
  const [emptyColor, setEmptyColor] = React.useState<string>('#A2A2A2');
  const [size, setSize] = React.useState('medium');
  const [value, setValue] = React.useState<number>(0);
  const [maxValue, setMaxValue] = React.useState<number>(5);

  const ratingProps = {
    size,
    setSize,
    value,
    setValue,
    maxValue,
    setMaxValue,
    fillColor,
    setFillColor,
    emptyColor,
    setEmptyColor,
  };

  return (
    <>
      <RatingPropControls {...ratingProps} />
      <Rating
        fillColor={fillColor}
        emptyColor={emptyColor}
        size={size}
        value={value}
        maxValue={maxValue}
      />
    </>
  );
};
