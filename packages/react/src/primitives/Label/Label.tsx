import * as React from 'react';
import { labelClasses, visuallyHiddenClasses } from '@aws-amplify/ui';

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
      className={labelClasses(undefined, [
        className,
        visuallyHidden && visuallyHiddenClasses(),
      ])}
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
