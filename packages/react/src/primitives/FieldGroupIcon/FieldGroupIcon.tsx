import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  BaseFieldGroupIconProps,
  FieldGroupIconProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const FieldGroupIconPrimitive: Primitive<
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

export const FieldGroupIcon: ForwardRefPrimitive<
  BaseFieldGroupIconProps,
  'button' | 'div'
> = React.forwardRef(FieldGroupIconPrimitive);

FieldGroupIcon.displayName = 'FieldGroupIcon';
