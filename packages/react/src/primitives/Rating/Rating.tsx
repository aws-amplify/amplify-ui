import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { RatingProps } from '../types';
import { Flex, View, IconStar, Text } from '@aws-amplify/ui-react';

const createIcon = (icon, fill, className) => {
  return (
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-ui-rating-label`)}>
        <View as="span" className={classNames(`flex`, className)} color={fill}>
          {icon}
        </View>
      </View>
    </View>
  );
};

const mixedIcon = (fillIcon, emptyIcon, value, fillColor, emptyColor) => {
  const widthPercentage = `${(value % 1) * 100}%`;
  return (
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View as="label" className={classNames(`amplify-ui-rating-label`)}>
        <View
          as="span"
          className={classNames(
            `amplify-ui-rating-icon`,
            `amplify-rating-icon-empty`
          )}
          color={emptyColor}
        >
          {emptyIcon}
        </View>
      </View>
      <View
        as="label"
        className={classNames(`amplify-ui-rating-label`)}
        width={widthPercentage}
      >
        <View
          as="span"
          className={classNames(
            `amplify-ui-rating-icon`,
            `amplify-rating-icon-filled`
          )}
          color={fillColor}
        >
          {fillIcon}
        </View>
      </View>
      <span className={`hidden`}>{`${value} stars`}</span>
    </View>
  );
};

export const Rating: React.FC<RatingProps> = props => {
  const {
    className,
    icon = React.createElement(IconStar),
    emptyIcon,
    size,
    fillColor,
    emptyColor,
    value = 0,
    maxValue = 5,
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
    >
      {items.map(val => {
        if (val === 'partial')
          return mixedIcon(
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
