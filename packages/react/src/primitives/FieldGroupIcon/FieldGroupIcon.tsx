import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { FieldGroupIconProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const FieldGroupIconPrimitive: PrimitiveWithForwardRef<
  FieldGroupIconProps,
  'button' | 'div'
> = (
  {
    className,
    children,
    isVisible = true,
    excludeFromTabOrder = false,
    ...rest
  },
  ref
) => {
  return isVisible ? (
    <View
      className={classNames(ComponentClassNames.FieldGroupIcon, className)}
      ref={ref}
      tabIndex={excludeFromTabOrder ? -1 : undefined}
      {...rest}
    >
      {children}
    </View>
  ) : null;
};

export const FieldGroupIcon = React.forwardRef(FieldGroupIconPrimitive);

FieldGroupIcon.displayName = 'FieldGroupIcon';
