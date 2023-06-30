import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import { Flex } from '../Flex';
import { isIconFilled, isIconEmpty, isIconMixed } from './utils';
import { RatingIcon } from './RatingIcon';
import { RatingMixedIcon } from './RatingMixedIcon';
import {
  BaseRatingProps,
  RatingProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { VisuallyHidden } from '../VisuallyHidden';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';

const RATING_DEFAULT_MAX_VALUE = 5;
const RATING_DEFAULT_VALUE = 0;

const RatingPrimitive: Primitive<RatingProps, 'div'> = (
  {
    className,
    emptyColor,
    emptyIcon,
    fillColor,
    icon,
    maxValue = RATING_DEFAULT_MAX_VALUE,
    size,
    value = RATING_DEFAULT_VALUE,
    ...rest
  },
  ref
) => {
  const { icons } = useTheme();

  const items = new Array(Math.ceil(maxValue)).fill(1).map((_, index) => {
    const currentIconIndex = index + 1;
    if (isIconFilled(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={icon ?? <Icon {...icons.rating.filled} />}
          fill={fillColor}
          className="amplify-rating-icon-filled"
        />
      );
    if (isIconEmpty(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={emptyIcon ?? icon ?? <Icon {...icons.rating.empty} />}
          fill={emptyColor}
          className="amplify-rating-icon-empty"
        />
      );
    if (isIconMixed(currentIconIndex, value))
      return (
        <RatingMixedIcon
          key={index.toString()}
          fillIcon={icon ?? <Icon {...icons.rating.filled} />}
          emptyIcon={emptyIcon ?? icon ?? <Icon {...icons.rating.empty} />}
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
export const Rating: ForwardRefPrimitive<BaseRatingProps, 'div'> =
  React.forwardRef(RatingPrimitive);

Rating.displayName = 'Rating';
