import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { PlaceholderProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const PlaceholderPrimitive: PrimitiveWithForwardRef<PlaceholderProps, 'div'> = (
  { className, children, isLoaded, size, ...rest },
  ref
) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      className={classNames(ComponentClassNames.Placeholder, className)}
      data-size={size}
      ref={ref}
      {...rest}
    />
  );
};

export const Placeholder = React.forwardRef(PlaceholderPrimitive);

Placeholder.displayName = 'Placeholder';
