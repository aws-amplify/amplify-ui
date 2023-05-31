import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
import { ComponentClassNames } from '../shared';
import { BasePlaceholderProps, ForwardRefPrimitive, Primitive } from '../types';
import { View } from '../View';

const PlaceholderPrimitive: Primitive<BasePlaceholderProps, 'div'> = (
  { className, children, isLoaded, size, ...rest },
  ref
) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      className={classNames(
        ComponentClassNames.Placeholder,
        classNameModifier(ComponentClassNames.Placeholder, size),
        className
      )}
      data-size={size}
      ref={ref}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/placeholder)
 */
export const Placeholder = React.forwardRef(
  PlaceholderPrimitive
) as ForwardRefPrimitive<BasePlaceholderProps, 'div'>;

Placeholder.displayName = 'Placeholder';
