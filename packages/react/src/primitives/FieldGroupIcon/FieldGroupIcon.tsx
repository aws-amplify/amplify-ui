import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseFieldGroupIconProps,
  FieldGroupIconProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';

const FieldGroupIconPrimitive: Primitive<FieldGroupIconProps, 'div'> = (
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
      className={classNames(ComponentClassName.FieldGroupIcon, className)}
      ref={ref}
      tabIndex={excludeFromTabOrder ? -1 : undefined}
      {...rest}
    >
      {children}
    </View>
  ) : null;
};

export const FieldGroupIcon: ForwardRefPrimitive<
  BaseFieldGroupIconProps,
  'div'
> = primitiveWithForwardRef(FieldGroupIconPrimitive);

FieldGroupIcon.displayName = 'FieldGroupIcon';
