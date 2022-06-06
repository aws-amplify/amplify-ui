import classNames from 'classnames';
import * as React from 'react';

import { classNameModifier } from '../shared/utils';
import { CardProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';
import { View } from '../View';

const CardPrimitive: Primitive<CardProps, 'div'> = (
  { className, children, variation, ...rest },
  ref
) => {
  return (
    <View
      className={classNames(
        ComponentClassNames.Card,
        classNameModifier(ComponentClassNames.Card, variation),
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
export const Card = React.forwardRef(CardPrimitive);

Card.displayName = 'Card';
