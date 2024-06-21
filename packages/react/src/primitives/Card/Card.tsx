import * as React from 'react';
import { cardClasses } from '@aws-amplify/ui';

import {
  BaseCardProps,
  CardProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const CardPrimitive: Primitive<CardProps, 'div'> = (
  { className, children, variation, ...rest },
  ref
) => {
  return (
    <View
      className={cardClasses({ _modifiers: [variation] }, [className])}
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
  primitiveWithForwardRef(CardPrimitive);

Card.displayName = 'Card';
