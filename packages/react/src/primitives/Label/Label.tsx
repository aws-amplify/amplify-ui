import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import {
  BaseLabelProps,
  LabelProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const LabelPrimitive: Primitive<LabelProps, 'label'> = (
  { children, className, visuallyHidden, ...rest },
  ref
) => {
  return (
    <View
      as="label"
      className={classNames(ComponentClassName.Label, className, {
        [ComponentClassName.VisuallyHidden]: visuallyHidden,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Label: ForwardRefPrimitive<BaseLabelProps, 'label'> =
  primitiveWithForwardRef(LabelPrimitive);

Label.displayName = 'Label';
