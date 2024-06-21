import * as React from 'react';
import { ratingClasses } from '@aws-amplify/ui';
import { Property } from 'csstype';

import { View } from '../View';
import { StyleToken } from '../types/style';

interface RatingMixedIconProps {
  emptyColor?: StyleToken<Property.Color>;
  emptyIcon: React.ReactNode;
  fillColor?: StyleToken<Property.Color>;
  fillIcon: React.ReactNode;
  value: number;
}

export const RatingMixedIcon: React.FC<RatingMixedIconProps> = ({
  emptyColor,
  emptyIcon,
  fillColor,
  fillIcon,
  value,
}) => {
  const widthPercentage = `${(value % 1) * 100}%`;
  return (
    <View
      as="span"
      className={ratingClasses({ _element: 'item' })}
      aria-hidden="true"
    >
      <View
        as="span"
        className={ratingClasses({ _element: { icon: 'empty' } })}
        color={emptyColor}
      >
        {emptyIcon}
      </View>
      <View
        as="span"
        className={ratingClasses({ _element: { icon: 'filled' } })}
        width={widthPercentage}
        color={fillColor}
      >
        {fillIcon}
      </View>
    </View>
  );
};

RatingMixedIcon.displayName = 'RatingMixedIcon';
