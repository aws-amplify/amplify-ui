import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { CardProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const CardPrimitive: PrimitiveWithForwardRef<CardProps, 'div'> = (
  { className, children, variation, ...rest },
  ref
) => (
  <View
    className={classNames(ComponentClassNames.Card, className)}
    data-variation={variation}
    ref={ref}
    {...rest}
  >
    {children}
  </View>
);

export const Card = React.forwardRef(CardPrimitive);

Card.displayName = 'Card';
