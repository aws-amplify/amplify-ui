import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { PlaceholderProps, Primitive } from '../types';
import { View } from '../View';

const PlaceholderPrimitive: Primitive<PlaceholderProps, 'div'> = (
  { className, children, isLoaded, size, ...rest },
  ref
) => {
  if (isLoaded) {
    return <>{children}</>;
  }
  size = size || 'default';

  return (
    <View
      className={classNames(
        ComponentClassNames.Placeholder,
        `${ComponentClassNames.Placeholder}--size-${size}`,
        className
      )}
      data-size={size}
      ref={ref}
      {...rest}
    />
  );
};

export const Placeholder = React.forwardRef(PlaceholderPrimitive);

Placeholder.displayName = 'Placeholder';
