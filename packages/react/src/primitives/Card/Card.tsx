import classNames from 'classnames';
import * as React from 'react';

import { CardProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const CardPrimitive: Primitive<CardProps, 'div'> = (
  { className, children, variation, ...rest },
  ref
) => {
  variation = variation || 'default';
  return (
    <View
      className={classNames(
        ComponentClassNames.Card,
        `${ComponentClassNames.Card}--variation-${variation}`,
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

export const Card = React.forwardRef(CardPrimitive);

Card.displayName = 'Card';
