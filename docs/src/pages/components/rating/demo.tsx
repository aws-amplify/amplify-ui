import React from 'react';
import { Rating, RatingProps } from '@aws-amplify/ui-react';
import { RatingPropControls } from './RatingPropControls';
import { useRatingProps } from './useRatingProps';
import { Demo } from '@/components/Demo';

const propsToCode = (props) => {
  return (
    `<Rating` +
    (props.size ? `\n  size=${JSON.stringify(props.size)}` : '') +
    `
  value={${props.value}}
  maxValue={${props.maxValue}}
  fillColor="${props.fillColor}"
  emptyColor="${props.emptyColor}"
  />`
  );
};

export const RatingDemo = () => {
  const ratingProps = useRatingProps({
    value: 2,
    maxValue: 5,
    fillColor: 'hsl(300, 95%, 30%)',
    emptyColor: 'hsl(210, 5%, 94%)',
  });

  return (
    <Demo
      code={propsToCode(ratingProps)}
      propControls={<RatingPropControls {...ratingProps} />}
    >
      <Rating
        value={ratingProps.value}
        size={ratingProps.size}
        maxValue={ratingProps.maxValue}
        fillColor={ratingProps.fillColor}
        emptyColor={ratingProps.emptyColor}
      />
    </Demo>
  );
};
