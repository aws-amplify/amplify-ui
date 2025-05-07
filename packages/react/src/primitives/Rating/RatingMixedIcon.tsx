import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import type { Property } from 'csstype';

import { View } from '../View';
import type { StyleToken } from '../types/style';
import { ComponentClassName, classNameModifier } from '@aws-amplify/ui';

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
      className={ComponentClassName.RatingItem}
      aria-hidden="true"
    >
      <View
        as="span"
        className={classNames(
          ComponentClassName.RatingIcon,
          classNameModifier(ComponentClassName.RatingIcon, 'empty')
        )}
        color={emptyColor}
      >
        {emptyIcon}
      </View>
      <View
        as="span"
        className={classNames(
          ComponentClassName.RatingIcon,
          classNameModifier(ComponentClassName.RatingIcon, 'filled')
        )}
        width={widthPercentage}
        color={fillColor}
      >
        {fillIcon}
      </View>
    </View>
  );
};

RatingMixedIcon.displayName = 'RatingMixedIcon';
