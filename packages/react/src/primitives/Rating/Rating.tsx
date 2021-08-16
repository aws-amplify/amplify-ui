import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { RatingProps } from '../types';
import { RatingIcon } from './RatingIcon';
import { RatingMixedIcon } from './RatingMixedIcon';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { IconStar } from '../Icon';
import { isIconFilled, isIconEmpty, isIconMixed } from './utils';

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
  const items = new Array(Math.ceil(maxValue)).fill(1).map((val, index) => {
    const currentIconIndex = index + 1;
    if (isIconFilled(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={icon}
          fill={fillColor}
          className="amplify-rating-icon-filled"
        />
      );
    if (isIconEmpty(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={emptyIcon || icon}
          fill={emptyColor}
          className="amplify-rating-icon-empty"
        />
      );
    if (isIconMixed(currentIconIndex, value))
      return (
        <RatingMixedIcon
          key={index.toString()}
          fillIcon={icon}
          emptyIcon={emptyIcon || icon}
          value={value}
          fillColor={fillColor}
          emptyColor={emptyColor}
        />
      );
  });
  return (
    <Flex
      className={classNames(ComponentClassNames.Rating, className)}
      data-size={size}
      {...rest}
    >
      {items}
      <Text className="sr-only">
        {value} out of {maxValue} rating
      </Text>
    </Flex>
  );
};
