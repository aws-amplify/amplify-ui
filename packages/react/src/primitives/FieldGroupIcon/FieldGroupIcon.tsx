import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  BaseFieldGroupIconProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const FieldGroupIconPrimitive: Primitive<
  BaseFieldGroupIconProps,
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

export const FieldGroupIcon = React.forwardRef(
  FieldGroupIconPrimitive
) as ForwardRefPrimitive<BaseFieldGroupIconProps, 'button' | 'div'>;

FieldGroupIcon.displayName = 'FieldGroupIcon';
