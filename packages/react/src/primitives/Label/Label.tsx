import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import {
  BaseLabelProps,
  LabelProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const LabelPrimitive: Primitive<LabelProps, 'label'> = (
  { children, className, visuallyHidden, ...rest },
  ref
) => {
  return (
    <View
      as="label"
      className={classNames(ComponentClassNames.Label, className, {
        [ComponentClassNames.VisuallyHidden]: visuallyHidden,
      })}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

export const Label: ForwardRefPrimitive<BaseLabelProps, 'label'> =
  React.forwardRef(LabelPrimitive);

Label.displayName = 'Label';
