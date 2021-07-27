import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
import { RatingProps } from '../types';
import { Flex, View, IconStar, Text } from '@aws-amplify/ui-react';

const createIcon = (icon, fill) => {
  return (
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View as="label" className={`absolute`} color={fill}>
        <span className={`flex`}>{icon}</span>
      </View>
    </View>
  );
};

const mixedIcon = (fillIcon, emptyIcon, value, fillColor, emptyColor) => {
  const widthPercentage = `${(value % 1) * 100}%`;
  return (
    <View as="span" className={classNames(`amplify-ui-rating-icon-container`)}>
      <View
        as="label"
        className={classNames(`amplify-ui-rating-label`)}
        color={emptyColor}
      >
        <span className={classNames(`amplify-ui-rating-icon`)}>
          {emptyIcon}
        </span>
      </View>
      <View
        as="label"
        className={classNames(`amplify-ui-rating-label`)}
        color={fillColor}
        width={widthPercentage}
      >
        <span className={classNames(`amplify-ui-rating-icon`)}>{fillIcon}</span>
      </View>
      <span className={`hidden`}>{`${value} stars`}</span>
    </View>
  );
};

export const Rating: React.FC<RatingProps> = props => {
  const {
    className,
    children,
    icon = React.createElement(IconStar),
    emptyIcon,
    size,
    fillColor = '#ffb400',
    emptyColor = '#A2A2A2',
    value = 4,
    max = 5,
    ...rest
  } = props;
  const items = new Array(max).fill(1).map((val, idx) => {
    if (idx + 1 <= value) return 'filled';
    if (idx + 1 > value && idx < value) return 'partial';
    return 'empty';
  });
  const nodes = {
    filled: createIcon(icon, fillColor),
    empty: createIcon(emptyIcon || icon, emptyColor),
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
    </Flex>
  );
};
