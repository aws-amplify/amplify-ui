import * as React from 'react';
import classNames from 'classnames';

import { classNameModifier } from '../shared/utils';
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
export const Placeholder = React.forwardRef(PlaceholderPrimitive);

Placeholder.displayName = 'Placeholder';
