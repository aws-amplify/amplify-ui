import * as React from 'react';
import { textClasses } from '@aws-amplify/ui';

import {
  BaseTextProps,
  TextProps,
  Primitive,
  ForwardRefPrimitive,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const TextPrimitive: Primitive<TextProps, 'p'> = (
  { as = 'p', className, children, isTruncated, variation, ...rest },
  ref
) => {
  return (
    <View
      as={as}
      className={textClasses(
        {
          _modifiers: [variation, isTruncated ? 'truncated' : undefined],
        },
        [className]
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/text)
 */
export const Text: ForwardRefPrimitive<BaseTextProps, 'p'> =
  primitiveWithForwardRef(TextPrimitive);

Text.displayName = 'Text';
