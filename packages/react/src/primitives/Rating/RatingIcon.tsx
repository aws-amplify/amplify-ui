import * as React from 'react';
import classNames from 'classnames';
import { Property } from 'csstype';

import { View } from '../View';
import { StyleToken } from '../types/style';

interface RatingIconProps {
  icon: JSX.Element;
  fill: StyleToken<Property.Color>;
  className: string;
}

export const RatingIcon: React.FC<RatingIconProps> = ({
  icon,
  fill,
  className,
}) => {
  return (
    <View as="span" className="amplify-rating-icon-container">
      <View as="span" className={classNames(className)} color={fill}>
        {icon}
      </View>
    </View>
  );
};

RatingIcon.displayName = 'RatingIcon';
