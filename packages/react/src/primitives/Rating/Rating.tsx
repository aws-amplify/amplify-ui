import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { RatingProps } from '../types';
import { createIcon } from './RatingIcon';
import { createMixedIcon } from './RatingMixedIcon';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { IconStar } from '../Icon';

const RATING_DEFAULT_MAX_VALUE = 5;
const RATING_DEFAULT_VALUE = 0;

export const Rating: React.FC<RatingProps> = (props) => {
  const {
    className,
    emptyColor,
    emptyIcon,
    fillColor,
    icon = <IconStar />,
    maxValue = RATING_DEFAULT_MAX_VALUE,
    size,
    value = RATING_DEFAULT_VALUE,
    ...rest
  } = props;
  const items = new Array(Math.ceil(maxValue)).fill(1).map((val, idx) => {
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
      {items.map((val) => {
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
