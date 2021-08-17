import React from 'react';
import classNames from 'classnames';
import { Property } from 'csstype';
import { View } from '../View';

interface RatingIconProps {
  icon: JSX.Element;
  fill: Property.Color;
  className: string;
}

export const RatingIcon: React.FC<RatingIconProps> = ({
  icon,
  fill,
  className,
}) => {
  return (
    <View as="span" className={classNames(`amplify-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-rating-label`)}>
        <View as="span" className={classNames(className)} color={fill}>
          {icon}
        </View>
      </View>
    </View>
  );
};
