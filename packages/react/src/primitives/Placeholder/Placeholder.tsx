import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  BasePlaceholderProps,
  PlaceholderProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const PlaceholderPrimitive: Primitive<PlaceholderProps, 'div'> = (
  { className, children, isLoaded, size, ...rest },
  ref
) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      className={classNames(
        ComponentClassName.Placeholder,
        classNameModifier(ComponentClassName.Placeholder, size),
        className
      )}
      ref={ref}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/placeholder)
 */
export const Placeholder: ForwardRefPrimitive<BasePlaceholderProps, 'div'> =
  primitiveWithForwardRef(PlaceholderPrimitive);

Placeholder.displayName = 'Placeholder';
