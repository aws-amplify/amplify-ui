import * as React from 'react';
import { RatingPropControls } from './RatingPropControls';
import { useRatingProps } from './useRatingProps';

import { Rating } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';

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

const defaultRatingProps = {
  value: 2,
  maxValue: 5,
  fillColor: 'hsl(300, 95%, 30%)',
  emptyColor: 'hsl(210, 5%, 94%)',
};

export const RatingDemo = () => {
  const ratingProps = useRatingProps(
    demoState.get(Rating.displayName) || defaultRatingProps
  );

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
