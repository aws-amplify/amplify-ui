import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { PrimitiveWithForwardRef } from '../types/view';
import { TextAreaProps } from '../types/textArea';
import { View } from '../View';

const TextAreaPrimitive: PrimitiveWithForwardRef<TextAreaProps, 'textarea'> = (
  {
    className,
    isReadOnly,
    isRequired,
    size,
    hasError = false,
    variation,
    ...rest
  },
  ref
) => (
  <View
    aria-invalid={hasError}
    as="textarea"
    className={classNames(
      ComponentClassNames.Textarea,
      ComponentClassNames.FieldGroupControl,
      className
    )}
    data-size={size}
    data-variation={variation}
    readOnly={isReadOnly}
    ref={ref}
    required={isRequired}
    {...rest}
  />
);

export const TextArea = React.forwardRef(TextAreaPrimitive);

TextArea.displayName = 'TextArea';
