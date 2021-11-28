import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { LabelProps, PrimitiveWithForwardRef } from '../types';
import { View } from '../View';

const LabelPrimitive: PrimitiveWithForwardRef<LabelProps, 'label'> = (
  { children, className, visuallyHidden, ...rest },
  ref
) => {
  return (
    <View
      as="label"
      className={classNames(ComponentClassNames.Label, className, {
        'sr-only': visuallyHidden,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Label = React.forwardRef(LabelPrimitive);

Label.displayName = 'Label';
