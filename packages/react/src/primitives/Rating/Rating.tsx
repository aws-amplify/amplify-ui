import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { IconStar } from '../Icon/internal';
import { isIconFilled, isIconEmpty, isIconMixed } from './utils';
import { RatingIcon } from './RatingIcon';
import { RatingMixedIcon } from './RatingMixedIcon';
import { RatingProps, Primitive } from '../types';
import { VisuallyHidden } from '../VisuallyHidden';

const RATING_DEFAULT_MAX_VALUE = 5;
const RATING_DEFAULT_VALUE = 0;

const RatingPrimitive: Primitive<RatingProps, typeof Flex> = (
  {
    className,
    emptyColor,
    emptyIcon,
    fillColor,
    icon = <IconStar />,
    maxValue = RATING_DEFAULT_MAX_VALUE,
    size,
    value = RATING_DEFAULT_VALUE,
    ...rest
  },
  ref
) => {
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
      className={classNames(
        ComponentClassNames.Rating,
        classNameModifier(ComponentClassNames.Rating, size),
        className
      )}
      data-size={size}
      ref={ref}
      {...rest}
    >
      {items}
      <VisuallyHidden>
        {value} out of {maxValue} rating
      </VisuallyHidden>
    </Flex>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/rating)
 */
export const Rating = React.forwardRef(RatingPrimitive);

Rating.displayName = 'Rating';
