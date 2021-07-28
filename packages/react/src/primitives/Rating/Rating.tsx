import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { RatingProps } from '../types';
import { createIcon } from './RatingIcon';
import { createMixedIcon } from './RatingMixedIcon';
import { Flex, IconStar, Text } from '@aws-amplify/ui-react';

export const Rating: React.FC<RatingProps> = props => {
  const {
    className,
    emptyColor,
    emptyIcon,
    fillColor,
    icon = React.createElement(IconStar),
    maxValue = 5,
    size,
    value = 0,
    ...rest
  } = props;
  const items = new Array(maxValue).fill(1).map((val, idx) => {
    if (idx + 1 <= value) return 'filled';
    if (idx + 1 > value && idx < value) return 'partial';
    return 'empty';
  });
  const nodes = {
    filled: createIcon(icon, fillColor, 'amplify-rating-icon-filled'),
    empty: createIcon(
      emptyIcon || icon,
      emptyColor,
      'amplify-rating-icon-empty'
    ),
  };
  return (
    <Flex
      className={classNames(ComponentClassNames.Rating, className)}
      color={fillColor}
      data-size={size}
      {...rest}
    >
      {items.map(val => {
        if (val === 'partial')
          return createMixedIcon(
            icon,
            emptyIcon || icon,
            value,
            fillColor,
            emptyColor
          );
        return nodes[val];
      })}
      <Text className="sr-only">
        {value} out of {maxValue} rating
      </Text>
    </Flex>
  );
};
