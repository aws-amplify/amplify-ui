import * as React from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import type { Property } from 'csstype';

import type { StyleToken } from '../types/style';
import { View } from '../View';

interface RatingIconProps {
  icon: React.ReactNode;
  fill?: StyleToken<Property.Color>;
  className: string;
}

export const RatingIcon: React.FC<RatingIconProps> = ({
  icon,
  fill,
  className,
}) => {
  return (
    <View
      as="span"
      className={ComponentClassName.RatingItem}
      aria-hidden="true"
    >
      <View
        as="span"
        className={classNames(ComponentClassName.RatingIcon, className)}
        color={fill}
      >
        {icon}
      </View>
    </View>
  );
};

RatingIcon.displayName = 'RatingIcon';
