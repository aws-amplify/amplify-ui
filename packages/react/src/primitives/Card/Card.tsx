import classNames from 'classnames';
import * as React from 'react';

import { CardProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const CardPrimitive: Primitive<CardProps, 'div'> = (
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
