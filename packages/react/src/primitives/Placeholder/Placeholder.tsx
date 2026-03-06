import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import type {
  BasePlaceholderProps,
  PlaceholderProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const CSS_VAR_START_COLOR: string =
  '--amplify-components-placeholder-start-color';
export const CSS_VAR_END_COLOR: string =
  '--amplify-components-placeholder-end-color';

const PlaceholderPrimitive: Primitive<PlaceholderProps, 'div'> = (
  { className, children, endColor, isLoaded, size, startColor, ...rest },
  ref
) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      className={classNames(
        ComponentClassName.Placeholder,
        classNameModifier(ComponentClassName.Placeholder, size),
        className
      )}
      ref={ref}
      style={{
        [CSS_VAR_START_COLOR]: startColor && `${startColor}`,
        [CSS_VAR_END_COLOR]: endColor && `${endColor}`,
      }}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/placeholder)
 */
export const Placeholder: ForwardRefPrimitive<BasePlaceholderProps, 'div'> =
  primitiveWithForwardRef(PlaceholderPrimitive);

Placeholder.displayName = 'Placeholder';
