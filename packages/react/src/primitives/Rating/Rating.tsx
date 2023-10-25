import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import { Flex } from '../Flex';
import { IconStar, useIcons } from '../Icon';
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
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

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
  const icons = useIcons('rating');
  const filledIcon = icon ?? icons?.filled ?? <IconStar />;
  const _emptyIcon = emptyIcon ?? icon ?? icons?.empty ?? <IconStar />;
  const items = new Array(Math.ceil(maxValue)).fill(1).map((_, index) => {
    const currentIconIndex = index + 1;
    if (isIconFilled(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={filledIcon}
          fill={fillColor}
          className={classNameModifier(ComponentClassName.RatingIcon, 'filled')}
        />
      );
    if (isIconEmpty(currentIconIndex, value))
      return (
        <RatingIcon
          key={index.toString()}
          icon={_emptyIcon}
          fill={emptyColor}
          className={classNameModifier(ComponentClassName.RatingIcon, 'empty')}
        />
      );
    if (isIconMixed(currentIconIndex, value))
      return (
        <RatingMixedIcon
          key={index.toString()}
          fillIcon={filledIcon}
          emptyIcon={_emptyIcon}
          value={value}
          fillColor={fillColor}
          emptyColor={emptyColor}
        />
      );
  });

  return (
    <Flex
      className={classNames(
        ComponentClassName.Rating,
        classNameModifier(ComponentClassName.Rating, size),
        className
      )}
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
  primitiveWithForwardRef(RatingPrimitive);

Rating.displayName = 'Rating';
