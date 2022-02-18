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
