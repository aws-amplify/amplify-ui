import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import {
  BaseCardProps,
  CardProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const CardPrimitive: Primitive<CardProps, 'div'> = (
  { className, children, variation, ...rest },
  ref
) => {
  return (
    <View
      className={classNames(
        ComponentClassName.Card,
        classNameModifier(ComponentClassName.Card, variation),
        className
      )}
      data-variation={variation}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/card)
 */
export const Card: ForwardRefPrimitive<BaseCardProps, 'div'> =
  React.forwardRef(CardPrimitive);

Card.displayName = 'Card';
