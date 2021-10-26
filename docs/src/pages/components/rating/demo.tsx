import React from 'react';
import { Rating } from '@aws-amplify/ui-react';
import { RatingPropControls } from '@/components/RatingPropControls';
import { Example } from '@/components/Example';

export const RatingDemo = () => {
  const [fillColor, setFillColor] = React.useState<string>();
  const [emptyColor, setEmptyColor] = React.useState<string>();
  const [size, setSize] = React.useState();
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
      <Example>
        <Rating
          fillColor={fillColor}
          emptyColor={emptyColor}
          size={size}
          value={value}
          maxValue={maxValue}
        />
      </Example>
    </>
  );
};

export const MyCoolSvg = () => {
  return (
    <svg className="my-cool-svg">
      <g>
        <g>
          <path d="M14.5,17c0,1.65-1.35,3-3,3s-3-1.35-3-3h2c0,0.55,0.45,1,1,1s1-0.45,1-1s-0.45-1-1-1H2v-2h9.5 C13.15,14,14.5,15.35,14.5,17z M19,6.5C19,4.57,17.43,3,15.5,3S12,4.57,12,6.5h2C14,5.67,14.67,5,15.5,5S17,5.67,17,6.5 S16.33,8,15.5,8H2v2h13.5C17.43,10,19,8.43,19,6.5z M18.5,11H2v2h16.5c0.83,0,1.5,0.67,1.5,1.5S19.33,16,18.5,16v2 c1.93,0,3.5-1.57,3.5-3.5S20.43,11,18.5,11z" />
        </g>
      </g>
    </svg>
  );
};
