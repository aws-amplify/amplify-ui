import * as React from 'react';
import { classNames } from '@aws-amplify/ui';
import { Property } from 'csstype';

import { View } from '../View';
import { StyleToken } from '../types/style';
import { ComponentClassName } from '@aws-amplify/ui';

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
      <View as="span" className={classNames(className)} color={fill}>
        {icon}
      </View>
    </View>
  );
};

RatingIcon.displayName = 'RatingIcon';
